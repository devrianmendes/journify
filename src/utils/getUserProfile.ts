import { createClient } from "@/lib/supabase/client";
import { UserProfile } from "@/types/loginType";

export const getUserProfile = async (userId: string) => {
  const supabase = createClient();
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  return {
    data: profile as UserProfile,
    error: profileError,
  };
};
