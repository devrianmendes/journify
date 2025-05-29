import { createClient } from "@/lib/client";
import { UserProfile } from "@/types/loginType";
import { PostgrestError } from "@supabase/supabase-js";



const getUserData = async (userId: string) => {
  const supabase = createClient();
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();
  // console.log(profile)
  return {
    data: profile as UserProfile,
    error: profileError,
  };
};

export default getUserData;