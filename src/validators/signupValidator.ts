import { z } from "zod";

export const SignUpSchema = z
  .object({
    username: z.string().min(3, "Mínimo de 3 caracteres."),
    email: z.string().email("Insira um e-mail válido."),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
        "A senha deve conter letras maiúsculas e minúsculas, números e caracteres especiais."
      ),
    repeatPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
        "A senha deve conter letras maiúsculas e minúsculas, números e caracteres especiais."
      ),
  })
  .superRefine(({ repeatPassword, password }, ctx) => {
    if (repeatPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas devem ser iguais.",
        path: ["repeatPassword"],
      });
    }
  });
