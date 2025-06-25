import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function CreatedTags() {
    
  return (
    <section>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Suas tags</CardTitle>
          <CardDescription>Tags que você criou.</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </section>
  );
}
