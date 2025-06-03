import { z } from "zod";

export const SignInSchema = z.object({
    email: z.string().email("Insira um e-mail válido."),
    password: z.string(),
  });