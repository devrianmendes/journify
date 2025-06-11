import Header from "@/components/header";
import studyImg from "../../public/images/study.png";
import progressImg from "../../public/images/progress.png";
import connectImg from "../../public/images/connect.png";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Circle, Square, Triangle } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="w-screen font-urbanist">
      <main>
        <Header />
        <section className="h-screen flex justify-center items-center text-center">
          <div>
            <p className="text-4xl font-bold">
              Acompanhe. Conecte. Suba de nível.
            </p>
            <p className="text-4xl font-bold text-stone-500 ">
              Para estudantes e desenvolvedores. Progresso visível.
            </p>
          </div>
        </section>

        <section className="h-screen flex justify-center items-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Card>
              <CardHeader>
                {/* <CardDescription></CardDescription> */}
              </CardHeader>
              <CardContent className="flex justify-center">
                <Image
                  src={studyImg}
                  height={150}
                  alt="Imagem ilustrando o ato de estudar."
                />
              </CardContent>
              <CardFooter>
                <CardTitle>Estude</CardTitle>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                {/* <CardDescription></CardDescription> */}
              </CardHeader>
              <CardContent className="flex justify-center">
                <Image
                  src={progressImg}
                  alt="Imagem ilustrando progresso."
                  height={150}
                />
              </CardContent>
              <CardFooter>
                <CardTitle>Progrida</CardTitle>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                {/* <CardDescription></CardDescription> */}
              </CardHeader>
              <CardContent className="flex justify-center">
                <Image
                  src={connectImg}
                  alt="Imagem ilustrando conexão entre pessoas"
                  height={150}
                />
              </CardContent>
              <CardFooter>
                <CardTitle>Conecte</CardTitle>
              </CardFooter>
            </Card>
          </div>
        </section>
        <section className="h-96 flex justify-center flex-col">
          <div className="h-96 flex flex-col gap-2 justify-center text-center items-center">
            <p className="text-2xl font-bold">Progrida inteligente.</p>
            <p className="text-xl text-muted-foreground">
              Nossa plataforma foi feita para facilitar seus estudos.
            </p>

            <Button asChild>
              <Link href={"/auth/sign-up"}>Criar conta</Link>
            </Button>
          </div>
          <footer className="h-32 flex items-center">
            <div className="flex items-center gap-1">
              <Circle />
              <Triangle />
              <Square />
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
