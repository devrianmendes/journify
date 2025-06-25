"use client";

import { createClient } from "@/lib/supabase/client";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuth: User | null;
};
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          throw error;
        }
        if (!data.user) {
          localStorage.removeItem("userData");
          await supabase.auth.signOut();
          redirect("/auth/login");
        }

        setIsAuth(data.user);
      } catch (error: unknown) {
        if (error instanceof AuthError) {
          console.error(error);
        }
        console.log(error);
      }
    };
    getUser();

    console.log(isAuth)

    // supabase.auth.onAuthStateChange((_event, session) => {
    //   setIsSession(user);
    // });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Error");
  }
  return context;
};
