import { Session } from "@supabase/supabase-js";
import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = () => {
    const [session, setSession] = useState<Session | null>(null);

    return(
        <AuthContext.Provider value={{session}}>
        </AuthContext.Provider>
    )
}