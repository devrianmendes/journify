import { SignUpSchema } from "@/validators/signupValidator";
import { publicProcedure, router } from "../trpc";
import { SignInSchema } from "@/validators/signinValidator";

export const AuthRouter = router({
  signup: publicProcedure
    .input(SignUpSchema)
    .mutation(async ({ input, ctx }) => {
      const { data, error } = await ctx.supabase.auth.signUp({
        email: input.email,
        password: input.password,
      });

      if (error && !data.user) {
        throw new Error(error.message);
      }

      if (data.user && data.user.confirmation_sent_at) {
        throw new Error(
          "Um novo e-mail de confirmação foi enviado para o seu e-mail. Verifique para poder realizar o login."
        );
      }

      return {
        data: data,
        error: null,
      };
    }),
  signin: publicProcedure.input(SignInSchema).mutation(async ({ input, ctx }) => {
    const { data, error } = await ctx.supabase.auth.getUser({
      email: input.email
    });

    console.log(data)
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
