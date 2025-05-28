import { createClient } from "@/lib/client";
import useSWR from "swr";

const loadSession = async () => {
  const supabase = createClient();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) throw new Error(sessionError.message);

  const session = sessionData.session;

  if (!session?.user) return null;

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (profileError) throw new Error(profileError.message);

  return {
    session,
    user: session.user,
    profile: profileData,
  };
};

export const useSession = () => {
  const { data, error, isLoading } = useSWR("/profiles", loadSession);

  console.log(data, "data no useSession");
  if (!data) throw new Error(error);
  return {
    session: data?.session,
    user: data?.user,
    profile: data?.profile,
    isLoading,
    isError: !!error,
  };
};
