import { auth } from "@/auth";
import { desc } from "drizzle-orm";
import { z } from "zod";

export const singUpSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  universityId: z.coerce
    .number()
    .min(2, "University ID must be at least 2 characters long"),
  universityCard: z.string().nonempty("University card is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const singInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export const bookSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters long"),
  description: z
    .string()
    .max(1000, "Description must be at most 1000 characters long"),
  author: z
    .string()
    .min(1, "Author is required")
    .max(100, "Author must be at most 100 characters long"),
  genre: z
    .string()
    .min(1, "Genre is required")
    .max(50, "Genre must be at most 50 characters long"),
  rating: z.coerce
    .number()
    .min(0, "Rating must be at least 0")
    .max(5, "Rating must be at most 5"),
  totalCopies: z.coerce
    .number()
    .int()
    .positive()
    .lte(1000, "Total copies must be at most 1000"),
  coverUrl: z.string().nonempty("Cover URL is required"),
  coverColor: z
    .string()
    .trim()
    .regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, "Invalid color code"),
  videoUrl: z.string().nonempty("Video URL is required"),
  summary: z
    .string()
    .min(10, "Summary must be at least 10 characters long")
    .max(500, "Summary must be at most 500 characters long"),
});
