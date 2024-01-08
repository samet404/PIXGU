"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'

import { trpc } from '@/_trpc/client'

import { type ReactNode } from 'react'

const Trpc = ({ children }: { children?: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient({}))
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: 'http://localhost:4000/api/trpc' })],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default Trpc
