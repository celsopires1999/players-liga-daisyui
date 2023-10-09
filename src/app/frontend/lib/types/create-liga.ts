import { z } from "zod";

export const createLigaSchema = z.object({
  name: z.string().trim().min(3, "name must be at least 3 characters"),
  imageUrl: z.string().trim().url("image URL must be a valid URL"),
});

export type TCreateLigaSchema = z.infer<typeof createLigaSchema>;
