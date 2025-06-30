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
import { useAuth } from "@/context/authContext";

export default function CreatedTags() {
  const { isAuth } = useAuth();

  const { data, isLoading } = trpc.tag.createdTags.useQuery(
    { creator_id: isAuth?.id || "" },
    { enabled: !!isAuth } 
  );

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
                    <Badge color={eachTag.color} key={eachTag.id}>{eachTag.name}</Badge>
                  ))
                : ""}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
