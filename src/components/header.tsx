import { Circle, Square, Triangle } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="container w-screen h-24 flex justify-center px-3 fixed bg-white">
      <div className="w-screen flex justify-between container">
        <div className="flex items-center gap-1">
          <Circle />
          <Triangle />
          <Square />
        </div>
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
