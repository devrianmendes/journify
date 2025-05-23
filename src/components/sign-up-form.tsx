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

const signupForm = z
  .object({
    email: z.string(),
    username: z.string(),
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/),
    repeatPassword: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/),
  })
  .superRefine(({ repeatPassword, password }, ctx) => {
    if (repeatPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["repeatPassword"],
      });
    }
  });

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [topButton, setTopButton] = useState(-320);
  const [showForm, setShowForm] = useState(false);
  const [showHello, setShowHello] = useState(false);

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("As senhas estão diferentes.");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });

      const user = data.user;

      if (user) {
        const { error } = await supabase.from("profiles").insert({
          username: username,
          user_id: user.id,
          email: user.email,
        });

        if (error) throw error;
      }

      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Um erro ocorreu.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep = () => {
    setStep(step + 1);
    if (step === 2) {
      setTopButton(topButton + 160);
    } else {
      setTopButton(topButton + 80);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowHello(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowForm(true);
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <p
        className={`scroll-m-20 text-2xl font-semibold tracking-tight transition-opacity duration-500 ${
          showHello ? "opacity-100" : "opacity-0"
        }`}
      >
        Olá,
      </p>
      <form
        onSubmit={handleSignUp}
        className={`transition-opacity duration-500 ${
          showForm ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col gap-6">
          <div
            className={`grid gap-2 transition-opacity duration-300 delay-150 ${
              step <= 0 ? "opacity-0" : "opacity-100"
            }`}
          >
            <Label htmlFor="email">Qual o seu e-mail?</Label>
            <Input
              id="email"
              type="email"
              // placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div
            className={`grid gap-2 transition-opacity duration-300 delay-150 ${
              step <= 1 ? "opacity-0" : "opacity-100"
            }`}
          >
            <Label htmlFor="username">Qual será seu username?</Label>
            <Input
              id="username"
              type="username"
              // placeholder="m@example.com"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div
            className={`grid gap-2 transition-opacity duration-300 delay-150 ${
              step <= 2 ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex items-center">
              <Label htmlFor="password">Defina sua senha:</Label>
            </div>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            className={`grid gap-2 transition-opacity duration-300 delay-150 ${
              step <= 2 ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex items-center">
              <Label htmlFor="repeat-password">Repita sua senha:</Label>
            </div>
            <Input
              id="repeat-password"
              type="password"
              required
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          <div
            style={{ top: `${topButton}px` }}
            className="relative transition-all duration-300"
          >
            {step < 3 ? (
              <Button onClick={handleStep}>Próximo</Button>
            ) : (
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Criando..." : "Crie sua conta"}
              </Button>
            )}
            <div
              className={`mt-4 text-center text-sm opacity-0 ${
                step <= 2 ? "opacity-0" : "opacity-100"
              }`}
            >
              Já tem uma conta?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Faça login
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
