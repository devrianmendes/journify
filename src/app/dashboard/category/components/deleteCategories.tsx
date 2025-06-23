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
import forceLogout from "@/hooks/use-logout";
import { activeSession } from "@/hooks/use-session";
import { trpc } from "@/lib/trpc/trpcClient";
import {
  DeleteCategorySchema,
  DeleteCategoryType,
} from "@/validators/categoryValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "@supabase/supabase-js";
import { LoaderPinwheel } from "lucide-react";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function DeleteCategory() {
  const [genericError, setGenericError] = useState<string | null>(null); //Erro vindo do banco
  const [session, setSession] = useState<Session | null>(null);

  const form = useForm({
    resolver: zodResolver(DeleteCategorySchema),
    defaultValues: {
      user_id: "",
      category_id: "",
    },
  });
  const utils = trpc.useUtils();

  //Verificando se o usuário possui sessão ativa. Se tiver, salva o id
  useEffect(() => {
    const getSession = async () => {
      try {
        const userSession = await activeSession();

        if (userSession && userSession.session) {
          setSession(userSession.session);
          form.setValue("user_id", userSession.session.user.id);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setGenericError("Erro. Verifique o log.");
          console.error(error.message);
        }
        return;
      }
    };

    getSession();
  }, []);

  //Carregando as categorias criadas pelo usuário para exibir no select para deletar
  const { data: createdData } = trpc.category.getOwnCreatedCategories.useQuery(
    {
      user_id: session!.user.id,
    },
    {
      enabled: !!session,
    }
  );

  const { mutate, isPending: pendingDelete } =
    trpc.category.deleteCategory.useMutation({
      onSuccess: () => {
        toast.success(`Categoria deletada.`);
        utils.category.getOwnCreatedCategories.invalidate();
        utils.category.getCreatedCategories.invalidate();
      },
      onError: (error) => {
        console.log(error, "erro no useMutation");
      },
    });

  const onSubmit = async (deleteCategoryData: DeleteCategoryType) => {
    try {
      if (!session) {
        forceLogout();
      } else {
        mutate({
          user_id: deleteCategoryData.user_id,
          category_id: deleteCategoryData.category_id,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setGenericError("Erro. Verifique o log.");
        console.error(error.message);
      }
    }
  };

  return (
    <section className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Deletar categorias</CardTitle>
          <CardDescription>
            Delete uma categoria que você criou.
          </CardDescription>
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
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Suas categorias</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
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
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {createdData &&
                          createdData.data.map((eachCategory) => (
                            <SelectItem
                              key={eachCategory.id}
                              value={eachCategory.id}
                            >
                              {eachCategory.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
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
              <Button disabled={pendingDelete} className="min-w-[130px]">
                {pendingDelete ? (
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
