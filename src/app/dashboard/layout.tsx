import { ActivitySidebar } from "@/components/activity-sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { Separator } from "@/components/ui/separator";
import {
  ActivityTrigger,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ui/theme-switcher";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <main className="w-full px-4">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="w-full">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="w-full flex items-center justify-between gap-2">
              <div className="flex">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 h-4 bg-white"
                />
                <h1>Journify</h1>
              </div>

              <div>
                <ModeToggle />
                <ActivityTrigger />
              </div>
            </div>
          </header>
          <div>{children}</div>
          {/* <AppContent>{children}</AppContent> */}
        </SidebarInset>
        <ActivitySidebar />
      </SidebarProvider>
    </main>
  );
}
