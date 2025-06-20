import { Circle, Square, Triangle } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-screen h-24 flex justify-center fixed px-10 bg-card dark:bg-card bg md:px-0 shadow-sm">
      <div className="w-full flex justify-between container">
        <Link href={"/"} className="flex items-center ">
          <div className="flex items-center gap-1">
            <Circle />
            <Triangle />
            <Square />
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link href={"/auth/login"} className="hover:cursor-pointer">
              Entrar
            </Link>
          </Button>

          <Button asChild>
            <Link href={"/auth/sign-up"}>Criar conta</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
