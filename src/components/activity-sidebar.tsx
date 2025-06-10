"use client";

import type * as React from "react";
import { MessageCircle, BookOpen, Trophy, Code, Zap, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/supabase/utils";

// Dados de exemplo para o feed de atividades
const activities = [
  {
    id: 1,
    user: "João Silva",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "começou a estudar",
    subject: "TypeScript",
    time: "2 min atrás",
    icon: BookOpen,
    color: "text-blue-500",
  },
  {
    id: 2,
    user: "Maria Santos",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "masterizou",
    subject: "C++",
    time: "15 min atrás",
    icon: Trophy,
    color: "text-yellow-500",
  },
  {
    id: 3,
    user: "Pedro Costa",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "completou o curso de",
    subject: "React",
    time: "1 hora atrás",
    icon: Star,
    color: "text-green-500",
  },
  {
    id: 4,
    user: "Ana Oliveira",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "iniciou um projeto em",
    subject: "Python",
    time: "2 horas atrás",
    icon: Code,
    color: "text-purple-500",
  },
  {
    id: 5,
    user: "Carlos Lima",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "alcançou nível avançado em",
    subject: "JavaScript",
    time: "3 horas atrás",
    icon: Zap,
    color: "text-orange-500",
  },
  {
    id: 6,
    user: "Lucia Ferreira",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "começou a estudar",
    subject: "Vue.js",
    time: "4 horas atrás",
    icon: BookOpen,
    color: "text-blue-500",
  },
  {
    id: 7,
    user: "Roberto Alves",
    avatar: "/placeholder.svg?height=32&width=32",
    action: "masterizou",
    subject: "Node.js",
    time: "5 horas atrás",
    icon: Trophy,
    color: "text-yellow-500",
  },
];

// Garantir geração da classe pelo Tailwind:
// [right-[-calc(var(--sidebar-width))]]

export function ActivitySidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { openSecondary, setOpenSecondary, isMobile } = useSidebar();

  if (isMobile)
    return (
      <div>
        <div
          className={cn(
          "fixed inset-y-0 right-0 z-50 w-[var(--sidebar-width)] h-svh bg-sidebar text-sidebar-foreground flex flex-col border-l transition-transform duration-200 ease-linear",
          openSecondary
            ? "translate-x-0"
            : "translate-x-full", // Esconde fora da tela à direita
          props.className
        )}
        style={{ touchAction: "none" }}
          {...props}
        >
          <SidebarHeader>
            <SidebarGroup>
              <SidebarGroupLabel className="text-lg font-semibold">
                Feed de Atividades
              </SidebarGroupLabel>
            </SidebarGroup>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <ScrollArea className="h-full">
                  <div className="space-y-4 p-2">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start space-x-3 rounded-lg p-3 hover:bg-sidebar-accent transition-colors"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={activity.avatar || "/placeholder.svg"}
                            alt={activity.user}
                          />
                          <AvatarFallback>
                            {activity.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-1">
                          <div className="flex items-center space-x-1">
                            <activity.icon
                              className={`h-4 w-4 ${activity.color}`}
                            />
                            <span className="text-sm text-sidebar-foreground/70">
                              {activity.time}
                            </span>
                          </div>

                          <p className="text-sm leading-relaxed">
                            <span className="font-medium">{activity.user}</span>{" "}
                            <span className="text-sidebar-foreground/80">
                              {activity.action}
                            </span>{" "}
                            <span className="font-semibold text-sidebar-foreground">
                              {activity.subject}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <div className="p-2">
              <Button
                className="w-full justify-start gap-2"
                variant="outline"
                size="sm"
              >
                <MessageCircle className="h-4 w-4" />
                Abrir Chat
              </Button>
            </div>
          </SidebarFooter>
        </div>
      </div>
    ); // Só renderiza se estiver aberto
  return (
    <div
      className={cn(
        "fixed inset-y-0 z-30 h-svh w-[var(--sidebar-width)] bg-sidebar text-sidebar-foreground flex flex-col border-l transition-[right,width] duration-200 ease-linear md:flex",
        // openSecondary ? "right-0" : "right-[-205px]",
        openSecondary
          ? "right-0"
          : isMobile
          ? "right-[-255px]"
          : "right-[-205px]",

        props.className
      )}
      {...props}
    >
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold">
            Feed de Atividades
          </SidebarGroupLabel>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <ScrollArea className="h-full">
              <div className="space-y-4 p-2">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 rounded-lg p-3 hover:bg-sidebar-accent transition-colors"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={activity.avatar || "/placeholder.svg"}
                        alt={activity.user}
                      />
                      <AvatarFallback>
                        {activity.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-1">
                        <activity.icon
                          className={`h-4 w-4 ${activity.color}`}
                        />
                        <span className="text-sm text-sidebar-foreground/70">
                          {activity.time}
                        </span>
                      </div>

                      <p className="text-sm leading-relaxed">
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-sidebar-foreground/80">
                          {activity.action}
                        </span>{" "}
                        <span className="font-semibold text-sidebar-foreground">
                          {activity.subject}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-2">
          <Button
            className="w-full justify-start gap-2"
            variant="outline"
            size="sm"
          >
            <MessageCircle className="h-4 w-4" />
            Abrir Chat
          </Button>
        </div>
      </SidebarFooter>
    </div>
  );
}
