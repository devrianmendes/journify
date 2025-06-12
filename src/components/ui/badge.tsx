import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/supabase/utils";

const badgeVariants = cva(
  "max-h-7 inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function getContrastTextColor(background: string): string {
  // Função auxiliar para calcular luminância de um hex
  function luminance(hex: string) {
    hex = hex.replace("#", "");
    if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  // Se for gradiente, extrai todas as cores
  if (background.startsWith("linear-gradient")) {
    const colorMatches = background.match(/#([0-9a-fA-F]{3,6})/g);
    if (colorMatches && colorMatches.length > 0) {
      // Calcula a luminância média das cores do gradiente
      const avgLuminance =
        colorMatches
          .map((hex) => luminance(hex))
          .reduce((a, b) => a + b, 0) / colorMatches.length;
      return avgLuminance < 140 ? "#fff" : "#000";
    }
    // fallback se não encontrar cor
    return "#000";
  }

  // Se for cor sólida
  if (background.startsWith("#")) {
    return luminance(background) < 140 ? "#fff" : "#000";
  }

  // fallback para outros formatos
  return "#000";
}

function Badge({
  className,
  variant,
  style,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
    style?: React.CSSProperties;
  }) {
  const Comp = asChild ? Slot : "span";

  const backgroundColor = style?.backgroundColor as string | undefined;
  const backgroundImage = style?.backgroundImage as string | undefined;
  let textColor = undefined;

  if (backgroundColor && /^#([0-9A-F]{3}){1,2}$/i.test(backgroundColor)) {
    textColor = getContrastTextColor(backgroundColor);
  } else if (backgroundImage && backgroundImage.startsWith("linear-gradient")) {
    textColor = getContrastTextColor(backgroundImage);
  }

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      style={{
        ...style,
        color: textColor,
      }}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
