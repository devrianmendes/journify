import { createClient } from "@/lib/supabase/client";
import { CategoryType } from "@/types/categoryType";

export const getCreatedCategories = async () => {
  try {
    const supabase = createClient();
    const { data: categoriesData, error: categoriesError } =
      await supabase.from("/categories").select(`
      id,
      name,
      slug,
      color`);

    if (!categoriesData || categoriesError) {
      return {
        data: null,
        error: categoriesError,
      };
    }

    return {
      data: categoriesData as CategoryType,
      error: categoriesError,
    };
  } catch (error: unknown) {
    return {
      data: null,
      error,
    };
  }
};

export const getOwnCreatedCategories = async () => {
  try {
    const supabase = createClient();
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (!session || sessionError) {
      return {
        data: null,
        error: sessionError,
      };
    }

    const { data: myCategories, error: myCategoriesError } = await supabase
      .from("categories")
      .select(
        `
      id,
      name,
      slug,
      color`
      )
      .eq("user_id", session.user.id);

    if (!myCategories || myCategoriesError) {
      return {
        data: null,
        error: myCategoriesError,
      };
    }
    return {
      data: myCategories as CategoryType,
      error: myCategoriesError,
    };
  } catch (error: unknown) {
    return {
      data: null,
      error,
    };
  }
};
