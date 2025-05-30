"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { GradientPicker } from "@/components/gradient-picker";

import { zodResolver } from "@hookform/resolvers/zod";
import { CategorySchema } from "@/validators/createCategoryValidator";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { LoaderPinwheel } from "lucide-react";
import { UserProfile } from "@/types/loginType";

type NewCategoryType = z.infer<typeof CategorySchema>;

export default function CreateCategories() {
  const [isLoading, setIsLoading] = useState(false); //Animação no botão de criar
  const [genericError, setGenericError] = useState<string | null>(null); //Erro vindo do banco
  const form = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      color: "",
    },
  });
  const exampleBadge = form.watch("name"); //Reatividade na badge de exemplo

  const onSubmit = async (newCategoryData: NewCategoryType) => {
    try {
      setGenericError(null); //Limpando erro vindo do banco
      setIsLoading(true); //Botão de criar
      const supabase = createClient();
      const userData: UserProfile  = JSON.parse(localStorage.getItem("userData")!);

      const { data, error } = await supabase.from("categories").insert({
        name: newCategoryData.name,
        slug: newCategoryData.name.toLowerCase().split(" ").join('-'),
        color: newCategoryData.color,
        user_id: userData.user_id
      });

      if (error) throw error;
    } catch (error: unknown) {
      console.log("Erro ao criar a conta: ", error);
      setGenericError("Um erro ocorreu. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Criar categorias</CardTitle>
          <CardDescription>Crie uma categoria específica.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <div className="flex w-full items-center gap-5">
                        <GradientPicker
                          background={field.value}
                          setBackground={field.onChange}
                          {...field}
                        />
                        <div className="flex gap-3">
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
                        </div>
                      </div>
                    </FormControl>
                    {/* <FormDescription></FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
                />
                {genericError && (
                  <span className="text-red-600 text-center">
                    {genericError}
                  </span>
                )}
              <Button disabled={isLoading}>
                {isLoading ? (
                  <LoaderPinwheel className="animate-spin" />
                ) : (
                  "Criar categoria"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
