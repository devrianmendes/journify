import { AppSidebar } from "../../../components/app-sidebar";
import { ActivitySidebar } from "../../../components/activity-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="w-full">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Categorias existentes</CardTitle>
          <CardDescription>
            Veja as categorias criadas pela comunidade.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
