"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { GradientPicker } from "@/components/gradient-picker";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { LoaderPinwheel } from "lucide-react";
import { trpc } from "@/lib/trpc/trpcClient";
import { NewTagType, TagSchema, TagType } from "@/validators/tagValidator";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

export default function CreateTags() {
  const [genericError, setGenericError] = useState<String | null>(null);
  const [success, setSuccess] = useState<String | null>(null);
  const { isAuth } = useAuth();
  const router = useRouter();
  const utils = trpc.useUtils();


  const { mutate, isPending } = trpc.tag.createTag.useMutation({
    onSuccess: () => {
      setSuccess("Tag criada.");
      utils.tag.createdTags.invalidate();
    },
    onError: (error) => {
      setGenericError("Erro ao criar tag. Verifique o log.");
      console.error(error);
    },
  });

  const form = useForm({
    resolver: zodResolver(TagSchema),
    defaultValues: {
      name: "",
      color: "",
    },
  });

  const onSubmit = (tagData: TagType) => {
    try {
      setGenericError(null);
      setSuccess(null);

      if (!isAuth) {
        router.push("/auth/login");
        return;
      }

      mutate({
        name: tagData.name,
        slug: tagData.name.toLowerCase().split(" ").join("-"),
        color: tagData.color,
        creator_id: isAuth.id,
      });
    } catch (error: unknown) {
      setGenericError("Erro ao registrar tag. Verifique o log.");
      console.error(error);
    }
  };

  return (
    <section className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Criar tags</CardTitle>
          <CardDescription>Crie uma tag específica.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (errors) => {
            
              })}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Criar tag..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cor da badge</FormLabel>
                    <FormControl>
                      <div className="flex flex-col md:flex-row gap-5">
                        <GradientPicker
                          background={field.value}
                          setBackground={field.onChange}
                          className="min-w-8"
                          {...field}
                        />
                        {/* <div className="flex gap-3">
                          Ex:{" "}
                          {field.value?.includes("linear-gradient") ? (
                            <Badge
                              style={{
                                backgroundImage: field.value,
                              }}
                            >
                              {exampleBadge ? exampleBadge : "typescript"}
                            </Badge>
                          ) : (
                            <Badge style={{ backgroundColor: field.value }}>
                              {exampleBadge ? exampleBadge : "typescript"}
                            </Badge>
                          )}
                        </div> */}
                      </div>
                    </FormControl>
                    {/* <FormDescription></FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {genericError && (
                <span className="text-red-600 block my-2">{genericError}</span>
              )}
              {success && (
                <span className="text-green-600 block my-2">{success}</span>
              )}
              <Button disabled={isPending} className="min-w-[130px]">
                {isPending ? (
                  <LoaderPinwheel className="animate-spin" />
                ) : (
                  "Criar tag"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
