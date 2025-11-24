import { config as loadEnv } from "dotenv";

import dummyBooks from "../dummy-books.json";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import type { InferInsertModel } from "drizzle-orm";
import { Buffer } from "node:buffer";

import { books } from "./schema";

type NewBook = InferInsertModel<typeof books>;

loadEnv({ path: ".env.local", override: false });
loadEnv({ override: false });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set. Add it to .env.local before seeding.");
}

const sql = neon(databaseUrl);
const db = drizzle({ client: sql });

const imagekitConfig = {
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
};

const hasImageKitConfig = Boolean(
  imagekitConfig.urlEndpoint &&
    imagekitConfig.publicKey &&
    imagekitConfig.privateKey,
);

const sanitizeFileName = (value: string) =>
  value.trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "_").slice(0, 80);

const getExtension = (url: string, fallback: string) => {
  try {
    const candidate = new URL(url).pathname.split(".").pop();
    if (candidate && candidate.length <= 5) {
      return candidate;
    }
  } catch {
    // Fall through to the fallback extension.
  }

  return fallback;
};

const uploadToImageKit = async (
  url: string,
  title: string,
  folder: string,
  fallbackExtension: string,
) => {
  if (!hasImageKitConfig) {
    return url;
  }

  const fileName = `${sanitizeFileName(title)}.${getExtension(url, fallbackExtension)}`;

  try {
    const formData = new FormData();
    formData.append("file", url);
    formData.append("fileName", fileName);
    formData.append("useUniqueFileName", "true");
    formData.append("folder", folder);

    const auth = Buffer.from(`${imagekitConfig.privateKey}:`).toString("base64");

    const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const message = await response.text().catch(() => response.statusText);
      throw new Error(message);
    }

    const payload = (await response.json()) as { url?: string; filePath?: string };

    if (payload.url) {
      return payload.url;
    }

    if (payload.filePath && imagekitConfig.urlEndpoint) {
      const normalizedPath = payload.filePath.startsWith("/")
        ? payload.filePath.slice(1)
        : payload.filePath;

      return `${imagekitConfig.urlEndpoint}/${normalizedPath}`;
    }

    return url;
  } catch (error) {
    console.error(`ImageKit upload failed for "${title}"`, error);
    return url;
  }
};

const seed = async () => {
  console.log("Seeding books...");

  if (!hasImageKitConfig) {
    console.warn(
      "ImageKit environment variables are missing. Using URLs from dummy data without re-uploading.",
    );
  }

  for (const rawBook of dummyBooks) {
    const book: NewBook = {
      ...rawBook,
      availableCopies: rawBook.availableCopies ?? rawBook.totalCopies ?? 0,
    };

    const [coverUrl, videoUrl] = await Promise.all([
      uploadToImageKit(book.coverUrl, `${book.title}-cover`, "/books/covers", "jpg"),
      uploadToImageKit(book.videoUrl, `${book.title}-video`, "/books/videos", "mp4"),
    ]);

    await db
      .insert(books)
      .values({
        ...book,
        coverUrl,
        videoUrl,
      })
      .onConflictDoNothing({ target: books.id });

    console.log(`✔ Inserted ${book.title}`);
  }

  console.log("Seeding finished.");
};

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
