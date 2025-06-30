// import { createClient } from "@/lib/supabase/client";
// import { redirect } from "next/navigation";

// export async function activeSession() {
//   try {
//     const supabase = createClient();
//     const { data, error } = await supabase.auth.getSession();

//     if (!data || !data.session) {
//       localStorage.removeItem("userData");
//       redirect("/auth/login");
//     }

//     if (data && data.session) {
//
//       return data;
//     }
//   } catch (error: unknown) {
//     throw error;
//   }
// }
