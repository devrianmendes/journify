"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/client";
import { cn } from "@/lib/utils";
import { LoaderPinwheel } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const SignUpSchema = z
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

type SignUpProps = z.infer<typeof SignUpSchema>;

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [genericError, setGenericError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<SignUpProps>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
  });

  const handleSignUp = async (userData: SignUpProps) => {
    try {
      setGenericError(null);
      const supabase = createClient();
      setIsLoading(true);
      const userAlreadyExist = await supabase
        .from("profiles")
        .select("email")
        .eq("email", userData.email);
      if (userAlreadyExist.data && userAlreadyExist.data.length >= 1)
        return form.setError("email", {
          type: "custom",
          message: "E-mail já existente.",
        });
      if (userAlreadyExist.error) throw userAlreadyExist.error;

      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      console.log("Erro ao criar a conta: ", error);
      setGenericError("Um erro ocorreu. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6 items-center", className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Criar conta</CardTitle>
          <CardDescription>Crie sua nova conta</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignUp)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qual o seu username?</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qual o seu e-mail?</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Defina sua senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repeatPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repita sua senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isLoading}>
                {isLoading ? (
                  <LoaderPinwheel className="animate-spin" />
                ) : (
                  "Criar conta"
                )}
              </Button>
              {genericError && (
                <span className="text-red-600 text-center">{genericError}</span>
              )}
              <div className="mt-4 text-center text-sm">
                Já tem conta?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4"
                >
                  Entrar
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
