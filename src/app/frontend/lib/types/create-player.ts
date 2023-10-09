import { Position } from "@prisma/client";
import { z } from "zod";

export const createPlayerSchema = z
  .object({
    liga_id: z.string().min(1, "liga_id must be at least 1 character"),
    name: z.string().trim().min(3, "name must be at least 3 characters"),
    imageUrl: z.string().trim().url("image URL must be a valid URL"),
    position: z.nativeEnum(Position),
  })
  .refine((data) => data.liga_id !== "1", {
    message: "liga cannot be 1",
    path: ["liga_id"],
  });

export type TCreatePlayerSchema = z.infer<typeof createPlayerSchema>;
