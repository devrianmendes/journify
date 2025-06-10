"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar,
} from "./ui/sidebar";
import { cn } from "@/lib/supabase/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { BookOpen, Code, MessageCircle, Star, Trophy, Zap } from "lucide-react";
import { Button } from "./ui/button";

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

export function ActivitySidebar(props: React.ComponentProps<"div">) {
  const { openSecondary, setOpenSecondary, isMobile } = useSidebar();

  if (isMobile) {
    return (
      <Sheet open={openSecondary} onOpenChange={setOpenSecondary}>
        <SheetContent
          data-sidebar="activity-sidebar"
          data-slot="activity-sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-[var(--sidebar-width)] p-0"
          style={
            {
              "--sidebar-width": "18rem", // ou SIDEBAR_WIDTH_MOBILE
            } as React.CSSProperties
          }
          side="right"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Atividades</SheetTitle>
            <SheetDescription>Feed de atividades</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">
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
                              <span className="font-medium">
                                {activity.user}
                              </span>{" "}
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
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: mantém o comportamento fixo/empurrando
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
