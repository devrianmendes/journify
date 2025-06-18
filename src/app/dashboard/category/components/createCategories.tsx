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
import { trpc } from "@/lib/trpc/trpcClient";
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

type NewCategoryType = z.infer<typeof CategorySchema>;

export default function CreateCategories() {
  const [genericError, setGenericError] = useState<string | null>(null); //Erro vindo do banco
  const utils = trpc.useUtils();

  const form = useForm({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      color: "",
    },
  });

  const { mutate, isPending } = trpc.category.createCategory.useMutation({
    onSuccess: (data) => {
      utils.category.getCreatedCategories.invalidate();
      utils.category.getOwnCreatedCategories.invalidate();
    },
    onError: (error) => {
      setGenericError(error.message);
    },
  });

  const exampleBadge = form.watch("name"); //Reatividade na badge de exemplo

  const teste = form.watch("name");
  const { data } = trpc.category.getFilteredCategories.useQuery({
    name: teste,
  });
  let teste1: StoredCategoryType[] | null = null;

  if (data && data.data) teste1 = data.data;

  console.log(teste1 && teste1, "teste1");

  const onSubmit = async (newCategoryData: NewCategoryType) => {
    try {
      setGenericError(null); //Limpando erro do estado
      let userData = localStorage.getItem("userData");

      if (!userData) {
        return;
      }

      mutate({
        name: newCategoryData.name,
        slug: newCategoryData.name.toLowerCase().split(" ").join("-"),
        color: newCategoryData.color,
        creator_id: JSON.parse(userData).user_id,
        is_public: true,
      });
    } catch (error: unknown) {
      console.log("Erro ao criar a conta: ", error);
      setGenericError("Um erro ocorreu. Tente novamente.");
    }
  };

  return (
    <section className="w-full">
      <Card className="w-full">
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
                      {/* <div className="relative">
                        <Input {...field} placeholder="Buscar categoria..."/>
                        {teste1 && (
                          <Command className="absolute z-10 w-full bg-background border rounded-md mt-1">
                            <CommandInput
                              placeholder="Buscar categoria..."
                              value={field.value}
                            />
                            <CommandList>
                              {teste1.length === 0 && (
                                <CommandEmpty>
                                  Nenhuma categoria encontrada.
                                </CommandEmpty>
                              )}
                              {teste1.map((cat) => (
                                <CommandItem
                                  key={cat.id}
                                  value={cat.name}
                                  onSelect={() =>
                                    form.setValue("name", cat.name)
                                  }
                                >
                                  {cat.name}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </Command>
                        )}
                      </div> */}
                      <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                        <CommandInput placeholder="Nome da categoria" />
                        <CommandList>
                          {!teste1 || teste1.length === 0 ? (
                            <CommandEmpty>
                              Nenhuma categoria encontrada.
                            </CommandEmpty>
                          ) : (
                            <>
                              <CommandGroup heading="Suggestions">
                                <CommandItem>
                                  <Calendar />
                                  <span>Calendar</span>
                                </CommandItem>
                                <CommandItem>
                                  <Smile />
                                  <span>Search Emoji</span>
                                </CommandItem>
                                <CommandItem disabled>
                                  <Calculator />
                                  <span>Calculator</span>
                                </CommandItem>
                              </CommandGroup>
                              <CommandSeparator />
                              <CommandGroup heading="Settings">
                                <CommandItem>
                                  <User />
                                  <span>Profile</span>
                                  <CommandShortcut>⌘P</CommandShortcut>
                                </CommandItem>
                                <CommandItem>
                                  <CreditCard />
                                  <span>Billing</span>
                                  <CommandShortcut>⌘B</CommandShortcut>
                                </CommandItem>
                                <CommandItem>
                                  <Settings />
                                  <span>Settings</span>
                                  <CommandShortcut>⌘S</CommandShortcut>
                                </CommandItem>
                              </CommandGroup>
                            </>
                          )}
                        </CommandList>
                      </Command>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div
                className={`flex flex-col bg-background w-40 h-auto ${
                  teste1 ? "block" : "hidden"
                }`}
              ></div>
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
              <Button disabled={isPending} className="min-w-[130px]">
                {isPending ? (
                  <LoaderPinwheel className="animate-spin" />
                ) : (
                  "Criar categoria"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
