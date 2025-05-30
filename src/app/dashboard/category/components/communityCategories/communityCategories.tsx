import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Wrapper from "./categoriesWrapper";

export default async function CommunityCategories() {
  
  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Categorias existentes</CardTitle>
          <CardDescription>
            Veja as categorias criadas pela comunidade.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Wrapper />
        </CardContent>
      </Card>
    </div>
  );
}
