"use client";
import { GradientPicker } from "@/components/gradient-picker";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CategoryType } from "@/types/categoryType";
import { UserProfile } from "@/types/loginType";
import { getCreatedCategories } from "@/utils/getCategoriesFunctions";
import { createClient } from "@/lib/supabase/client";
import { Badge, LoaderPinwheel } from "lucide-react";
import { useEffect, useState } from "react";
import { Form } from "react-hook-form";
import { getOwnCreatedCategories } from "@/utils/getCategoriesFunctions";

export default function DeleteCategory() {
  const [category, setCategory] = useState<CategoryType>([]);
  const [isLoading, setIsLoading] = useState(false); //Animação no botão de criar
  const [genericError, setGenericError] = useState<string | null>(null); //Erro vindo do banco

  getOwnCreatedCategories();

  console.log(category);

  const onSubmit = async (newCategoryData: any) => {
    try {
      setGenericError(null); //Limpando erro vindo do banco
      setIsLoading(true); //Botão de criar
      const supabase = createClient();
      const userData: UserProfile = JSON.parse(
        localStorage.getItem("userData")!
      );

      const { data, error } = await supabase.from("categories").insert({
        name: newCategoryData.name,
        slug: newCategoryData.name.toLowerCase().split(" ").join("-"),
        color: newCategoryData.color,
        user_id: userData.user_id,
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
    <section>
      a
      {/* <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Criar categorias</CardTitle>
            <CardDescription>Crie uma categoria específica.</CardDescription>
          </CardHeader>
          <CardContent>
            
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
        </Card> */}
    </section>
  );
}
