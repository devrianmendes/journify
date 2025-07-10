import { TRPCError } from "@trpc/server";
import { AlreadyExist } from "@/errors/already-exist-error";
import { NotFoundError } from "./not-found-error";

export function handleServiceError(error: unknown): never {
  if (error instanceof AlreadyExist) {
    throw new TRPCError({ code: "CONFLICT", message: error.message });
  }

  if (error instanceof NotFoundError) {
    throw new TRPCError({ code: "NOT_FOUND", message: error.message });
  }

  if (error instanceof TRPCError) {
    throw error;
  }

  throw new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: "Erro inesperado.",
  });
}
