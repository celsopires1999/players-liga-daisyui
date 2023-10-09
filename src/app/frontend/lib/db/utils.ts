import { Prisma } from "@prisma/client";

export function checkDuplicatedError(msg: string, e: unknown) {
  if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
    throw new Error(msg);
  } else {
    throw e;
  }
}

export function isDuplicatedError(e: unknown) {
  return (
    e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002"
  );
}
