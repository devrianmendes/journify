"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/client";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "./ui/form";
import { LoaderPinwheel } from "lucide-react";
import Link from "next/link";

const loginForm = z.object({
  email: z.string().email({ message: "Insira um e-mail válido." }),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
      message:
        "A senha deve conter no mínimo 8 caracteres contendo letras maiúsculas e minúsculas, números e caracteres especiais.",
    }),
});

type SignUpProps = z.infer<typeof loginForm>;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof loginForm>>({
    resolver: zodResolver(loginForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: SignUpProps) => {
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        throw new Error(error.code);
      }

      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/dashboard");
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">Olá,</CardTitle>
          <CardDescription>Bem-vindo de volta</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Senha:</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <LoaderPinwheel className="animate-spin" />
                ) : (
                  "Entrar"
                )}
              </Button>
              {error && <p className="text-red-500">{error}</p>}
              <div className="mt-4 text-center text-sm">
                Já tem uma conta?{" "}
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

{
  /* <Button type="submit" className="w-full" disabled={isLoading}>
  {isLoading ? <LoaderPinwheel className='animate-spin'/> : 'Entrar'}
</Button> */
}
