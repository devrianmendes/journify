import { createClient } from "@/lib/supabase/client";

export async function activeSession() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getSession();

    if (data && data.session) {
      console.log(data, "no server");
      return data;
    }
  } catch (error: unknown) {
    throw error;
  }
}
