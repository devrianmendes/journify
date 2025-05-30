import { z } from "zod";

export const loginFormValidator = () => {
  const loginSchema = z.object({
    email: z.string().email("Insira um e-mail válido."),
    password: z.string(),
  });
  return loginSchema;
};
