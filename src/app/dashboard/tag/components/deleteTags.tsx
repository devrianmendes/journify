"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  FormDescription,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthContext, useAuth } from "@/context/authContext";
import forceLogout from "@/hooks/use-logout";
import { trpc } from "@/lib/trpc/trpcClient";
import {
  DeleteCategorySchema,
  DeleteCategoryType,
} from "@/validators/categoryValidator";
import { DeleteTagSchema, DeleteTagType } from "@/validators/tagValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "@supabase/supabase-js";
import { LoaderPinwheel } from "lucide-react";

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function DeleteTags() {
  const [genericError, setGenericError] = useState<String | null>(null);
  const { isAuth } = useAuth();

  if (!isAuth) return;

  const {data} = trpc.tag.createdTags.useQuery({ creator_id: isAuth.id });

  const { mutate, isPending } = trpc.tag.deleteTags.useMutation({
    onSuccess: () => {
      console.log("deu bom");
    },
    onError: () => {
      console.log("deu ruim");
    },
  });

  const form = useForm({
    resolver: zodResolver(DeleteTagSchema),
    defaultValues: {
      id: "",
      creator_id: "",
    },
  });

  const onSubmit = async (deleteTagData: DeleteTagType) => {
    console.log(deleteTagData);

    mutate;
  };

  return (
    <section className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Deletar tags</CardTitle>
          <CardDescription>Delete uma tag que você criou.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (errors) => {
                console.log("Formulário inválido", errors);
              })}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Suas categorias</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        {/* <SelectTrigger
                          disabled={
                            !createdData || createdData.data.length === 0
                          }
                        >
                          <SelectValue
                            placeholder={
                              !createdData || createdData.data.length === 0
                                ? "Sem categoria criada."
                                : "Selecione a categoria"
                            }
                          />
                        </SelectTrigger> */}
                      </FormControl>
                      {/* <SelectContent>
                        {createdData &&
                          createdData.data.map((eachCategory) => (
                            <SelectItem
                              key={eachCategory.id}
                              value={eachCategory.id}
                            >
                              {eachCategory.name}
                            </SelectItem>
                          ))}
                      </SelectContent> */}
                    </Select>
                    <FormDescription>
                      <span className="block">
                        Apenas categorias criadas por você poderão ser
                        deletadas.
                      </span>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {genericError && (
                <span className="text-red-600 text-center">{genericError}</span>
              )}
              <Button disabled={isPending} className="min-w-[130px]">
                {isPending ? (
                  <LoaderPinwheel className="animate-spin" />
                ) : (
                  "Deletar categoria"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
