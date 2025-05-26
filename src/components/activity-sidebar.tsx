"use client"

import type * as React from "react"
import { MessageCircle, BookOpen, Trophy, Code, Zap, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
]

export function ActivitySidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar side="right" className="border-l" {...props}>
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold">Feed de Atividades</SidebarGroupLabel>
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
                      <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.user} />
                      <AvatarFallback>
                        {activity.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-1">
                        <activity.icon className={`h-4 w-4 ${activity.color}`} />
                        <span className="text-sm text-sidebar-foreground/70">{activity.time}</span>
                      </div>

                      <p className="text-sm leading-relaxed">
                        <span className="font-medium">{activity.user}</span>{" "}
                        <span className="text-sidebar-foreground/80">{activity.action}</span>{" "}
                        <span className="font-semibold text-sidebar-foreground">{activity.subject}</span>
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
          <Button className="w-full justify-start gap-2" variant="outline" size="sm">
            <MessageCircle className="h-4 w-4" />
            Abrir Chat
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
