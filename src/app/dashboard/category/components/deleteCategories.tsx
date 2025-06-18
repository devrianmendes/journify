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
import { createClient } from "@/lib/supabase/client";
import { trpc } from "@/lib/trpc/trpcClient";
import { SessionType, UserProfile } from "@/types/loginType";
import {
  DeleteCategorySchema,
  DeleteCategoryType,
} from "@/validators/categoryValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderPinwheel } from "lucide-react";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function DeleteCategory() {
  const [genericError, setGenericError] = useState<string | null>(null); //Erro vindo do banco
  const form = useForm({
    resolver: zodResolver(DeleteCategorySchema),
    defaultValues: {
      user_id: "",
      category_id: "",
    },
  });
  const utils = trpc.useUtils();
  const storedData = localStorage.getItem("userData");
  if (!storedData) {
    const supabase = createClient();
    supabase.auth.signOut();
    return;
  }
  const userData: UserProfile = JSON.parse(storedData);


  const { data } = trpc.category.getOwnCreatedCategories.useQuery({
    user_id: userData.user_id,
  });

  const { mutate, isPending: pendingDelete } =
    trpc.category.deleteCategory.useMutation({
      onSuccess: (data) => {
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
      const userData = await activeSession();
      if (!userData) {
        forceLogout();
      } else {
        form.setValue("user_id", userData.session.user.id);

        mutate({
          user_id: deleteCategoryData.user_id,
          category_id: deleteCategoryData.category_id,
        });
      }

    } catch (error: unknown) {}
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
              onSubmit={form.handleSubmit(onSubmit)}
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
                        {!data ? (
                          <SelectTrigger disabled>
                            <SelectValue placeholder="Sem categoria criada." />
                          </SelectTrigger>
                        ) : (
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a categoria" />
                          </SelectTrigger>
                        )}
                      </FormControl>
                      <SelectContent>
                        {data &&
                          data.data.map((eachCategory) => (
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
