"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { trpc } from "@/lib/trpc/trpcClient";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { LoaderPinwheel } from "lucide-react";

export default function CreatedTags() {
  const { data, isLoading } = trpc.tag.createdTags.useQuery();

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
  // console.log(data, "data no createDTAG");

  return (
    <section>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Suas tags</CardTitle>
          <CardDescription>Tags que você criou</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <LoaderPinwheel className="animate-spin min-w-20" />
          ) : (
            <div className="flex flex-wrap gap-3">
              {data && data.status === true
                ? data.data.map((eachTag) => (
                    <Badge color={eachTag.color}>{eachTag.name}</Badge>
                  ))
                : ""}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
