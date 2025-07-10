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
  FormMessage,
} from "@/components/ui/form";
import { GradientPicker } from "@/components/gradient-picker";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CategorySchema,
  CategoryType,
  StoredCategoryType,
} from "@/validators/categoryValidator";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  LoaderPinwheel,
  Settings,
  Smile,
  User,
} from "lucide-react";
import { trpc } from "@/lib/trpc/trpc-client";
import { SelectContent, SelectItem } from "@radix-ui/react-select";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "cmdk";
import { CommandShortcut } from "@/components/ui/command";
import { useAuth } from "@/context/authContext";

export default function CreateCategories() {
  const [genericError, setGenericError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const utils = trpc.useUtils();
  const { isAuth } = useAuth();

  const form = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      color: "",
    },
  });

  const { mutate, isPending } = trpc.category.createCategory.useMutation({
    onSuccess: (data) => {
      setSuccess("Sugestão enviada para a administração.");
    },
    onError: (error) => {
      setGenericError(error.message);
    },
  });

  const exampleBadge = form.watch("name"); //Reatividade na badge de exemplo

  const onSubmit = async (categoryData: CategoryType) => {
    try {
      setGenericError(null);
      setSuccess(null);

      if (!isAuth) return;
      mutate({
        name: categoryData.name,
        slug: categoryData.name.toLowerCase().split(" ").join("-"),
        color: categoryData.color,
        creator_id: isAuth.id,
        is_public: false,
      });
    } catch (error: unknown) {
      setGenericError("Um erro ocorreu. Tente novamente.");
    } finally {
      form.reset();
    }
  };

  return (
    <section className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Novas categorias</CardTitle>
          <CardDescription>
            Caso precise de uma categoria que ainda não está disponível, basta
            sugerir abaixo que ela será analisada e inserida em poucos minutos:
          </CardDescription>
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
              <div></div>
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
                <span className="text-red-600 block my-2">{genericError}</span>
              )}
              {success && (
                <span className="text-green-700 block my-2">{success}</span>
              )}
              <Button disabled={isPending} className="min-w-[130px]">
                {isPending ? (
                  <LoaderPinwheel className="animate-spin" />
                ) : (
                  "Enviar sugestão"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
