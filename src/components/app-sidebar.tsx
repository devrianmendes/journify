"use client";

import {
  AudioWaveform,
  Book,
  Bookmark,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  Lock,
  Tag,
  UserPen,
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
import { createClient } from "@/lib/supabase/client";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const { username, email, avatar_url } = JSON.parse(
  //   localStorage.getItem("userData")!
  // );

  const dataMenu = {
    user: {
      name: "mudar",
      email: "mudar",
      avatar: "mudar",
    },
    
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
        // items: [
        //   {
        //     title: "Em andamento",
        //     url: "#",
        //   },
        //   {
        //     title: "Próximos estudos",
        //     url: "#",
        //   },
        //   {
        //     title: "Revisar",
        //     url: "#",
        //   },
        //   {
        //     title: "Masterizado",
        //     url: "#",
        //   },
        // ],
      },
      {
        title: "Categorias",
        url: "/dashboard/category",
        icon: Bookmark,
      },
      {
        title: "Tags",
        url: "/dashboard/tag",
        icon: Tag,
      },
      {
        title: "Perfil",
        url: "/profile",
        icon: UserPen,
      },
      {
        title: "Conta",
        url: "/account",
        icon: Lock,
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

  const supabase = createClient();

  // const [user, setUser] = React.useState(supabase.auth.getUser());
  React.useEffect(() => {
    const fun = async () => {
      const user = await supabase.auth.getUser();

    };
    fun();
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={dataMenu.teams} /> */}
        <p>INSERIR HEADER AQUI</p>
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
