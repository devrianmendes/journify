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
import { cn } from "@/lib/supabase/utils";
import { SignInSchema } from "@/validators/signinValidator";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { trpc } from "@/lib/trpc/trpcClient";

type SignInProps = z.infer<typeof SignInSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [genericError, setGenericError] = useState<string | null>(null);

  const router = useRouter();
  const form = useForm<SignInProps>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = trpc.auth.signin.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("userData", JSON.stringify(data.data[0]));
      toast.success(`Bem-vindo(a), ${data.data[0].username}.`);
      router.push("/dashboard");
    },
    onError: (error) => {
      setGenericError(error.message);

    },
  });

  const onSubmit = async (loginData: SignInProps) => {
    setGenericError(null);

    mutate({
      email: loginData.email,
      password: loginData.password,
    });
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
              <Button disabled={isPending}>
                {isPending ? (
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
                  href="/auth/sign-up"
                  className="underline underline-offset-4"
                >
                  Criar
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
