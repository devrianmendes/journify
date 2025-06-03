'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Importa diretamente do arquivo centralizado do cliente tRPC
import { trpc, trpcClient } from '@/lib/trpc/trpcClient'; 
import { useState } from 'react';

export function TRPCProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    // Configurações opcionais do QueryClient, como defaultOptions
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutos
      },
    },
  }));

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}