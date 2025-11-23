"use client";

import { useEffect, useRef, useState } from "react";
import {
  upload,
  ImageKitAbortError,
  ImageKitUploadNetworkError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
} from "@imagekit/next";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = {
  type: "image" | "video";
  accept?: string;
  folder?: string;
  onFileChange?: (url: string) => void;
  placeholder?: string;
  variant: "dark" | "light";
};

export default function FileUpload({
  type,
  accept = "image/*",
  folder = "/uploads",
  onFileChange,
  placeholder = "Upload a file",
  variant = "light",
}: Props) {
  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  /* ====================================
     🔴 Cleanup when component unmounts
     ==================================== */
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  /* ====================================
     🔵 Validate File Type
     ==================================== */
  const isAcceptedType = (file: File) => {
    const patterns = accept
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (!patterns.length) return true;

    return patterns.some((pattern) => {
      if (pattern === "*/*") return true;
      if (pattern.endsWith("/*")) {
        return file.type.startsWith(pattern.replace("/*", ""));
      }
      return file.type === pattern;
    });
  };

  /* ====================================
     🟣 Validate File Size
     ==================================== */
  const validateSize = (file: File) => {
    const maxMB = type === "image" ? 20 : 50;
    const maxBytes = maxMB * 1024 * 1024;

    if (file.size > maxBytes) {
      toast.error("File too large", {
        description: `Maximum allowed size is ${maxMB}MB`,
      });
      return false;
    }
    return true;
  };

  /* ====================================
     🟠 Fetch ImageKit Auth Data
     ==================================== */
  const getAuth = async () => {
    const res = await fetch("/api/imagekit");
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  };

  /* ====================================
     🟡 Pick + Upload File
     ==================================== */
  const handleClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;

    input.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement | null;
      const file = target?.files?.[0];
      if (!file) return;

      // Validate before upload
      if (!isAcceptedType(file)) {
        toast.error("File type not allowed");
        return;
      }

      if (!validateSize(file)) return;

      try {
        // Cancel any previous upload
        abortRef.current?.abort();

        const abortController = new AbortController();
        abortRef.current = abortController;
        setProgress(0);

        const { token, expire, signature, publicKey } = await getAuth();

        const response = await upload({
          file,
          fileName: file.name,
          token,
          expire,
          signature,
          publicKey,
          folder,
          useUniqueFileName: true,
          onProgress: (event) =>
            setProgress((event.loaded / event.total) * 100),
          abortSignal: abortController.signal,
        });

        setUrl(response.url);
        onFileChange?.(response.url);
        setProgress(100);
        setFilePath(response.filePath);
        toast.success("File uploaded successfully");
      } catch (err) {
        handleUploadError(err);
        setProgress(0);
      }
    };

    input.click();
  };

  /* ====================================
     🟢 Handle Upload Errors
     ==================================== */
  const handleUploadError = (err: unknown) => {
    if (err instanceof ImageKitAbortError) {
      toast.info("Upload canceled");
    } else if (err instanceof ImageKitUploadNetworkError) {
      toast.error("Network error during upload");
    } else if (err instanceof ImageKitInvalidRequestError) {
      toast.error("Invalid request during upload");
    } else if (err instanceof ImageKitServerError) {
      toast.error("Server error from ImageKit");
    } else {
      toast.error("Upload failed", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    }
  };

  /* ====================================
     🟤 UI
     ==================================== */
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={handleClick}
        className={cn("upload-btn", styles.button)}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>
        {filePath && (
          <p className={cn("upload-filename", styles.text)}>{filePath}</p>
        )}
      </button>

      {/* Progress Bar */}
      {progress > 0 && progress < 100 && (
        <div className="w-full rounded text-sm  text-center">
          <div
            className="h-2 rounded bg-green-500 progress"
            style={{ width: `${progress}%` }}
          />
          {progress.toFixed(0)}%
        </div>
      )}

      {/* Preview */}
      {url && (
        <div className="mt-3">
          {type === "image" && (
            <Image
              src={url}
              alt="Uploaded image"
              width={340}
              height={180}
              className="rounded-lg"
            />
          )}

          {type === "video" && (
            <video src={url} controls className="w-[300px] rounded-lg" />
          )}
        </div>
      )}
    </div>
  );
}
