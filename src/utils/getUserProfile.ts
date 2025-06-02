import { createClient } from "@/lib/supabase/client";
import { UserProfile } from "@/types/loginType";

export const getUserProfile = async (user_id: string) => {
  const supabase = createClient();
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user_id)
    .single();

  return {
    data: profile as UserProfile,
    error: profileError,
  };
};
