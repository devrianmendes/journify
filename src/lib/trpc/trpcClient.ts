import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from '@/server/routers/appRouter'; // Verifique se o caminho está correto

// Centraliza a criação do hook tRPC e do cliente
export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      // Use uma variável de ambiente para a URL base em produção
      url: typeof window !== 'undefined' ? '/api/trpc' : `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/trpc`, // Absoluto no servidor,
      transformer: superjson,
    }),
  ],
});

