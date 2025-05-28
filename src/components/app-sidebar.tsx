"use client";

import {
  AudioWaveform,
  Book,
  Bookmark,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  Tag,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import { useSession } from "@/hooks/useSession";
import { useSessionData } from "@/hooks/useSessionData";

// import {useSession} from "@/hooks/useSession";

// This is sample data.
const dataMenu = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Início",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Estudos",
      url: "#",
      icon: Book,
      items: [
        {
          title: "Em andamento",
          url: "#",
        },
        {
          title: "Próximos estudos",
          url: "#",
        },
        {
          title: "Revisar",
          url: "#",
        },
        {
          title: "Masterizado",
          url: "#",
        },
      ],
    },
    {
      title: "Categorias",
      url: "#",
      icon: Bookmark,
      items: [
        {
          title: "Comunidade (recomendado)",
          url: "#",
        },
        {
          title: "Adicionar",
          url: "#",
        },
        {
          title: "Remover",
          url: "#",
        },
      ],
    },
    {
      title: "Tags",
      url: "#",
      icon: Tag,
      items: [
        {
          title: "Comunidade (recomendado)",
          url: "#",
        },
        {
          title: "Adicionar",
          url: "#",
        },
        {
          title: "Remover",
          url: "#",
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const { data, error } = await supabase.auth.getSession();

  // const userData = useSessionData();
  // console.log(userData);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={dataMenu.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={dataMenu.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={dataMenu.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
