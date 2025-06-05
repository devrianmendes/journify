"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/supabase/utils";
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
import { SignUpSchema } from "@/validators/signupValidator";
import { trpc } from "@/lib/trpc/trpcClient";

type SignUpProps = z.infer<typeof SignUpSchema>;

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
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

  const { mutate, isPending } = trpc.auth.signup.useMutation({
    onSuccess: (data) => {
      router.push("/auth/sign-up-success");
    },
    onError: (err) => {
      setGenericError(err.message);
    },
  });

  const onSubmit = async (userData: SignUpProps) => {
    setGenericError(null);
    mutate({
      email: userData.email,
      password: userData.password,
      repeatPassword: userData.repeatPassword,
      username: userData.username,
    });
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
              onSubmit={form.handleSubmit(onSubmit)}
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

              <Button disabled={isPending}>
                {isPending ? (
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
