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
import { createClient } from "@/lib/supabase/client";
import { UserProfile } from "@/types/loginType";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { username, email, avatar_url } = JSON.parse(
    localStorage.getItem("userData")!
  );

  const dataMenu = {
    user: {
      name: username,
      email: email,
      avatar: avatar_url,
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
        url: "/dashboard/study",
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
        url: "/dashboard/category",
        icon: Bookmark,
        items: [
          {
            title: "Comunidade (recomendado)",
            url: "/dashboard/category",
          },
          {
            title: "Adicionar",
            url: "/dashboard/category",
          },
          {
            title: "Remover",
            url: "/dashboard/category",
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

  // const { data, error } = await supabase.auth.getSession();

  // const userData = useSessionData();
  // console.log(userData);
  const supabase = createClient();

  // const [user, setUser] = React.useState(supabase.auth.getUser());
  React.useEffect(() => {
    const fun = async () => {
      const user = await supabase.auth.getUser();
      console.log(user, "getUser do context");
    };
    fun();
  }, []);

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
