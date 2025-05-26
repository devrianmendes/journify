import { createClient } from "@/lib/client";
import useSWR from "swr";

const loadSession = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) throw new Error(error.message);

  return data.session;
};

export const useSession = () => {
  const { data, error, isLoading } = useSWR("/profiles", loadSession);

  console.log(data);
  return {
    session: data,
    user: data?.user,
    isLoading,
    isError: !!error,
  };
};
