import { SignUpSchema } from "@/validators/signupValidator";
import { publicProcedure, router } from "../trpc";
import { SignInSchema } from "@/validators/signinValidator";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/drizzle/drizzle.config";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";

export const AuthRouter = router({
  signup: publicProcedure
    .input(SignUpSchema)
    .mutation(async ({ input, ctx }) => {
      const { data, error } = await ctx.supabase.auth.signUp({
        email: input.email,
        password: input.password,
        options: {
          data: {
            username: input.username,
          },
        },
      });

      console.log(data, "data on signup");
      console.log(error, "error on signup");

      if (data.user && Object.keys(data.user.user_metadata).length <= 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "E-mail já está em uso.",
        });
      }

      if (data.user && Object.keys(data.user.user_metadata).length > 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message:
            "Foi enviado um novo e-mail para confirmação. É necessário confirmar o e-mail para prosseguir.",
        });
      }

      if (!data.user && error?.code === "over_email_send_rate_limit") {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Limite de envio de e-mail excedido. Aguarde 60 segundos.",
        });
      }

      if (!data.user && error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Erro ao criar conta. Tente novamente.",
        });
      }

      return { data: data, error: error };
    }),
  signin: publicProcedure
    .input(SignInSchema)
    .mutation(async ({ input, ctx }) => {
      const { data, error } = await ctx.supabase.auth.signInWithPassword({
        email: input.email,
        password: input.password,
      });

      if (error) {
        if (error.code === "invalid_credentials") {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Usuário ou senha inválidos.",
          });
        }
        if (error.code === "email_not_confirmed") {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "É necessário confirmar o e-mail para prosseguir.",
          });
        }
      }

      if (!data.user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Erro ao criar conta. Tente novamente.",
        });
      }

      if (!data.user.email_confirmed_at) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "É necessário confirmar o e-mail para prosseguir.",
        });
      }

      const existingProfile = await db
        .select()
        .from(profiles)
        .where(eq(profiles.email, data.user.email!));

      if (existingProfile.length === 0) {
        await db.insert(profiles).values({
          username: data.user.user_metadata.username,
          email: data.user.email!,
          user_id: data.user.id,
        });
      }

      return { data: data, error: error };
    }),
});

// if (error) {
//   if (error.message.toLowerCase().includes("user already registered")) {
//     throw new Error("E-mail já está em uso.");
//   }
//   throw new Error("Erro ao criar conta. Tente novamente.", error);
// }

// if (!data.user) throw new Error("Erro ao criar conta. Tente novamente.");

// await db
//   .insert(profiles)
//   .values({
//     id: data.user.id,
//     email: input.email,
//     username: input.username,
//     bio: "",
//     avatar_url: "",
//   })
//   .returning({
//     id: profiles.id,
//     email: profiles.email,
//     username: profiles.username,
//   });
