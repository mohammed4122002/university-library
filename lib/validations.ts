import { z } from "zod";

export const singUpSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  universityId: z.coerce.number().min(2, "University ID must be at least 2 characters long"),
  universityCard: z.string().nonempty("University card is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const singInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})
