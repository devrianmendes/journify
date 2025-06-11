"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/supabase/utils";
import { Paintbrush } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export function PickerExample() {
  const [background, setBackground] = useState("#B4D455");

  return (
    <div
      className="w-full h-full preview flex min-h-[350px] justify-center p-10 items-center rounded !bg-cover !bg-center transition-all"
      style={{ background }}
    >
      <GradientPicker background={background} setBackground={setBackground} />
    </div>
  );
}

export function GradientPicker({
  background,
  setBackground,
  className,
}: {
  background: string;
  setBackground: (background: string) => void;
  className?: string;
}) {
  const solids = [
    "#F44336",
    "#FF5733",
    "#FF6F61",
    "#E57373",
    "#FF8A80",

    "#FD7E14",
    "#FF9800",
    "#FB8C00",
    "#F57C00",
    "#FFCC80",
    "#FFE0B2",

    "#FFC107",
    "#FBC02D",
    "#FDD835",
    "#FFF176",
    "#FFF9C4",
    "#AFB42B",

    "#28A745",
    "#4CAF50",
    "#43A047",
    "#81C784",
    "#A5D6A7",
    "#C8E6C9",
    "#8BC34A",

    "#20C997",
    "#00BCD4",
    "#0097A7",
    "#00796B",
    "#B2EBF2",
    "#80DEEA",

    "#1E88E5",
    "#33B5FF",
    "#0288D1",
    "#039BE5",
    "#03A9F4",
    "#81D4FA",
    "#B3E5FC",

    "#6F42C1",
    "#9C27B0",
    "#7B1FA2",
    "#8E24AA",
    "#BA68C8",
    "#CE93D8",
    "#E1BEE7",

    "#D81B60",
    "#C2185B",
    "#E91E63",
    "#F06292",
    "#F48FB1",
    "#F8BBD0",
    "#E83E8C",

    "#795548",
    "#5D4037",
    "#8D6E63",
    "#A1887F",
    "#D7CCC8",

    "#616161",
    "#9E9E9E",
    "#BDBDBD",
    "#E0E0E0",
    "#F5F5F5",
    "#607D8B",
    "#455A64",
    "#78909C",
  ];

  const gradients = [
    "linear-gradient(to top left,#accbee,#e7f0fd)",
    "linear-gradient(to top left,#d5d4d0,#d5d4d0,#eeeeec)",
    "linear-gradient(to top left,#000000,#434343)",
    "linear-gradient(to top left,#09203f,#537895)",
    "linear-gradient(to top left,#AC32E4,#7918F2,#4801FF)",
    "linear-gradient(to top left,#f953c6,#b91d73)",
    "linear-gradient(to top left,#ee0979,#ff6a00)",
    "linear-gradient(to top left,#F00000,#DC281E)",
    "linear-gradient(to top left,#00c6ff,#0072ff)",
    "linear-gradient(to top left,#4facfe,#00f2fe)",
    "linear-gradient(to top left,#0ba360,#3cba92)",
    "linear-gradient(to top left,#FDFC47,#24FE41)",
    "linear-gradient(to top left,#8a2be2,#0000cd,#228b22,#ccff00)",
    "linear-gradient(to top left,#40E0D0,#FF8C00,#FF0080)",
    "linear-gradient(to top left,#fcc5e4,#fda34b,#ff7882,#c8699e,#7046aa,#0c1db8,#020f75)",
    "linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)",
    "linear-gradient(to top left,#ffe9e9,#ffc6c6)",
    "linear-gradient(to top left,#d4fc79,#96e6a1)",
    "linear-gradient(to top left,#fbc2eb,#a6c1ee)",
    "linear-gradient(to top left,#fdfcfb,#e2d1c3)",
    "linear-gradient(to top left,#ffecd2,#fcb69f)",
    "linear-gradient(to top left,#a1c4fd,#c2e9fb)",
    "linear-gradient(to top left,#fbc2eb,#fcd5ce)",
    "linear-gradient(to top left,#84fab0,#8fd3f4)",
    "linear-gradient(to top left,#c2e59c,#64b3f4)",
    "linear-gradient(to top left,#e0c3fc,#8ec5fc)",
    "linear-gradient(to top left,#fddb92,#d1fdff)",
    "linear-gradient(to top left,#f6d365,#fda085)",
    "linear-gradient(to top left,#e0eafc,#cfdef3)",
    "linear-gradient(to top left,#e6dee9,#f0f0f0)",
    "linear-gradient(to top left,#f093fb,#f5576c)",
    "linear-gradient(to top left,#4e54c8,#8f94fb)",
    "linear-gradient(to top left,#667eea,#764ba2)",
    "linear-gradient(to top left,#30cfd0,#330867)",
    "linear-gradient(to top left,#c471f5,#fa71cd)",
    "linear-gradient(to top left,#12c2e9,#c471ed,#f64f59)",
  ];

  // const images = [
  //   "url(https://images.unsplash.com/photo-1691200099282-16fd34790ade?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
  //   "url(https://images.unsplash.com/photo-1691226099773-b13a89a1d167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90",
  //   "url(https://images.unsplash.com/photo-1688822863426-8c5f9b257090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
  //   "url(https://images.unsplash.com/photo-1691225850735-6e4e51834cad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=90)",
  // ];

  const defaultTab = useMemo(() => {
    if (background.includes("url")) return "image";
    if (background.includes("gradient")) return "gradient";
    return "solid";
  }, [background]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[150px] justify-start text-left font-normal",
            !background && "text-muted-foreground",
            className
          )}
        >
          <div className="w-full flex items-center gap-2">
            {background ? (
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                style={{ background }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="truncate flex-1">
              {background ? background : "Escolha uma cor"}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger className="flex-1" value="solid">
              Cor sólida
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="gradient">
              Gradiente
            </TabsTrigger>
          </TabsList>

          <TabsContent value="solid" className="flex flex-wrap gap-1 mt-0">
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                onClick={() => setBackground(s)}
              />
            ))}
          </TabsContent>

          <TabsContent value="gradient" className="mt-0">
            <div className="flex flex-wrap gap-1 mb-2">
              {gradients.map((s) => (
                <div
                  key={s}
                  style={{ background: s }}
                  className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                  onClick={() => setBackground(s)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Input
          id="custom"
          value={background}
          className="col-span-2 h-8 mt-4"
          onChange={(e) => setBackground(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  );
}

const GradientButton = ({
  background,
  children,
}: {
  background: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className="p-0.5 rounded-md relative !bg-cover !bg-center transition-all"
      style={{ background }}
    >
      <div className="bg-popover/80 rounded-md p-1 text-xs text-center">
        {children}
      </div>
    </div>
  );
};
