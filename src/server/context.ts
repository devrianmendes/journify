// server/context.ts
import { inferAsyncReturnType } from "@trpc/server";
import { cookies } from "next/headers";
// Importe o cliente Supabase *server-side* se você tiver um configurado separadamente
// import { createServerClient } from "@/lib/supabase/server";
// Ou continue usando o cliente que você já tem, mas crie-o com os cookies
import { createClient } from "@/lib/supabase/server"; // Assumindo que este pode ser usado no servidor com cookies

/**
 * Cria o contexto para cada requisição tRPC.
 * Este contexto estará disponível para todos os seus procedures.
 */
export async function createContext() {
  // Crie uma instância do cliente Supabase específica para esta requisição,
  // passando os cookies para que ele possa determinar o usuário autenticado.
  // A implementação exata pode variar dependendo de como seu `@/lib/supabase/client` é configurado.
  // Se você tiver um `createServerClient` dedicado, use-o aqui.
  const supabase = await createClient(); // Adapte se necessário

  try {
    // Tenta obter os dados do usuário autenticado
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Retorna o cliente Supabase e o usuário (pode ser null se não autenticado)
    return {
      supabase,
      user,
      session
    };
  } catch (error) {
    console.error("Erro ao obter usuário no contexto tRPC:", error);
    // Mesmo em caso de erro ao buscar usuário, retorne o cliente supabase
    // para procedures públicos que não dependem de autenticação.
    return {
      supabase,
      user: null,
      session: null
    };
  }
}

// Define o tipo do contexto inferido da função createContext
export type Context = Awaited<ReturnType<typeof createContext>>;
