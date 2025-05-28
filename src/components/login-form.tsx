"use client";

import { Button } from "@/components/ui/button";
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
import { loginFormValidator } from "@/validators/signinValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "@supabase/supabase-js";
import { LoaderPinwheel } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { toast } from "sonner";
import getUserData from "@/hooks/getUserData";

const FormSchema = loginFormValidator();
type SignInProps = z.infer<typeof FormSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [genericError, setGenericError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const form = useForm<SignInProps>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (loginData: SignInProps) => {
    const supabase = createClient();
    setIsLoading(true);
    setGenericError(null);

    try {
      const { data: auth, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
      });
      if (error) throw error;

      const { data: profile, error: profileError } = await getUserData(
        auth.user.id
      );
      if (profileError) throw profileError;

      toast.success(`Bem-vindo(a), ${profile.username}.`);
      router.push("/dashboard");
    } catch (error: unknown) {
      if (error instanceof AuthError) {
        setGenericError(
          error.code === "invalid_credentials"
            ? "Usuário ou senha inválidos."
            : `Erro genérico: ${error.message}`
        );
        console.log(error.code);
      } else {
        setGenericError(`Erro genérico. Verifique o log.`);
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Acesse sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
                    <FormLabel>Senha</FormLabel>
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
                  "Entrar"
                )}
              </Button>
              {genericError && (
                <span className="text-red-600 text-center">{genericError}</span>
              )}
              <div className="mt-4 text-center text-sm">
                Ainda não possui conta?{" "}
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
<div className="mt-4 text-center text-sm"></div>;
