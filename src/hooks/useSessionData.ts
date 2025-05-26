import { createClient } from "@/lib/client";
import useSWR from "swr";
import { useSession } from "./loadSession";

export const useSessionData = async () => {
  const supabase = createClient();
  const { user } = await useSession();
  if (!user) return;
  //   const { data, error } = await supabase.auth.getSession();
  const { data } = await supabase
    .from("profiles")
    .select("username, email, avatar_url")
    .eq("user_id", user.id);

  console.log(data, ' do profile');
};

// export const useSession = () => {
//   const { data, error, isLoading } = useSWR("/profiles", loadSession);

//   console.log(data);
//   return {
//     session: data,
//     user: data?.user,
//     isLoading,
//     isError: !!error,
//   };
// };
