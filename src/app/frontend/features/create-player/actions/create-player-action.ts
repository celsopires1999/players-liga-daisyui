"use server";

import prisma from "@/app/frontend/lib/db/prisma";
import { isDuplicatedError } from "@/app/frontend/lib/db/utils";
import {
  TCreatePlayerSchema,
  createPlayerSchema,
} from "@/app/frontend/lib/types/create-player";

export type CreatePlayerOutput =
  | {
      errorType: string;
      error: string | Record<string, string>;
    }
  | undefined;

export async function createPlayer(
  newPlayer: TCreatePlayerSchema,
): Promise<CreatePlayerOutput> {
  const parsedInput = createPlayerSchema.safeParse(newPlayer);

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
    await prisma.playerModel.create({
      data: {
        name: parsedInput.data.name,
        ligaId: parsedInput.data.liga_id,
        imageUrl: parsedInput.data.imageUrl,
        position: parsedInput.data.position,
      },
    });
  } catch (error) {
    if (isDuplicatedError(error)) {
      return {
        errorType: "database",
        error: `Player exists already with name ${parsedInput.data.name} in the liga`,
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
      error: "player has not been created. Please contact your support",
    };
  }
}
