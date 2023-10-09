"use server";

import prisma from "@/app/frontend/lib/db/prisma";
import { isDuplicatedError } from "@/app/frontend/lib/db/utils";
import {
  TCreateLigaSchema,
  createLigaSchema,
} from "@/app/frontend/lib/types/create-liga";
export type CreateLigaOutput =
  | {
      errorType: string;
      error: string | Record<string, string>;
    }
  | undefined;

export async function createLiga(
  newLiga: TCreateLigaSchema,
): Promise<CreateLigaOutput> {
  const parsedInput = createLigaSchema.safeParse(newLiga);

  if (!parsedInput.success) {
    let zodErrors: Record<string, string> = {};
    parsedInput.error.issues.forEach((issue) => {
      zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
    });

    return {
      errorType: "field validation",
      error: zodErrors,
    };
  }

  try {
    await prisma.ligaModel.create({
      data: {
        name: parsedInput.data.name,
        imageUrl: parsedInput.data.imageUrl,
      },
    });
  } catch (error) {
    if (isDuplicatedError(error)) {
      return {
        errorType: "database",
        error: `Liga exists already with name ${parsedInput.data.name}`,
      };
    }
    if (error instanceof Error) {
      return {
        errorType: "server",
        error: error.message,
      };
    }
    console.error(error);
    return {
      errorType: "server",
      error: "liga has not been created. Please contact your support",
    };
  }
}
