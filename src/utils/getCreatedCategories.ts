import { createClient } from "@/lib/client";

export default async function getCreatedCategories() {
  const supabase = createClient();
  const getCategories = await supabase.from("/categories").select({});
}
