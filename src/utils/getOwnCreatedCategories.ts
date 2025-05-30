import { createClient } from "@/lib/supabase/client";
import { CategoryType } from "@/types/categoryType";

export const getOwnCreatedCategories = async (user_id: string) => {
  const supabase = createClient();
  const { data: categoriesData, error: categoriesError } = await supabase
    .from("/categories")
    .select(
      `
    id,
    name,
    slug,
    color`
    )
    .eq("user_id");

  return {
    data: categoriesData as CategoryType,
    error: categoriesError,
  };
};
