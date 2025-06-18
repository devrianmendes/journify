import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export default async function forceLogout() {
  const supabase = createClient();

  localStorage.removeItem("userData");
  await supabase.auth.signOut();
  redirect("/auth/login");
}
