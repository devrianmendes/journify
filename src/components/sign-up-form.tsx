"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { LoaderPinwheel } from "lucide-react";

const signupForm = z
  .object({
    email: z.string().email(),
    username: z.string().min(3, {
      message: "O usuário deve conter no mínimo 3 caracteres.",
    }),
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message:
          "A senha deve conter no mínimo 8 caracteres contendo letras maiúsculas e minúsculas, números e caracteres especiais.",
      }),
    repeatPassword: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
        message: "As senhas devem ser iguais.",
      }),
  })
  .superRefine(({ repeatPassword, password }, ctx) => {
    if (repeatPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas precisam ser iguais.",
        path: ["repeatPassword"],
      });
    }
  });

type SignUpProps = z.infer<typeof signupForm>;

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [topButton, setTopButton] = useState(-200);
  const [showForm, setShowForm] = useState(false);
  const [showHello, setShowHello] = useState(false);

  const router = useRouter();

  const form = useForm<SignUpProps>({
    resolver: zodResolver(signupForm),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      repeatPassword: "",
    },
  });

  const handleSignUp = async (userData: SignUpProps) => {
    console.log(userData);
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });

      const user = data.user;

      if (user) {
        const { error } = await supabase.from("profiles").insert({
          username: userData.username,
          user_id: user.id,
          email: user.email,
        });

        if (error) throw error;
      }

      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === "invalid_credentials") {
          setError("Usuário ou senha inválidos.");
        } else {
          setError("Um erro ocorreu");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <p className="scroll-m-20 text-2xl mb-6 font-semibold tracking-tight transition-opacity duration-500 w-40">
        Olá,
      </p>
      <form
        onSubmit={form.handleSubmit(handleSignUp)}
        className="transition-opacity flex flex-col duration-500 gap-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qual o seu e-mail?</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {/* <FormDescription>
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qual o seu username?</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {/* <FormDescription>
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qual sua senha?</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              {/* <FormDescription>
              </FormDescription> */}
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
              {/* <FormDescription>
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button type="submit">Submit</Button> */}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <LoaderPinwheel className="animate-spin" /> : "Crie sua conta"}
        </Button>
        <div className="mt-4 text-center text-sm">
          Já tem uma conta?{" "}
          <Link href="/auth/login" className="underline underline-offset-4">
            Entrar
          </Link>
        </div>
      </form>
    </Form>
  );
}
