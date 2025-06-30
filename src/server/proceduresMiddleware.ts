// src/server/trpc/middleware.ts
import { TRPCError } from "@trpc/server";
import { middleware } from "./trpc";
import { redirect } from "next/navigation";

export const isAuthed = middleware(async ({ ctx, next }) => {

  if (!ctx.user || ctx.user.aud !== "authenticated") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
