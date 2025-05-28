import { createClient } from "@/lib/client";

const getUserData = async (userId: string) => {
  const supabase = createClient();
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  return {
    data: profile,
    error: profileError,
  };
};

export default getUserData;