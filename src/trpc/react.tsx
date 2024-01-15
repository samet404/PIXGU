'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCReact } from '@trpc/react-query'
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client'

import { useState } from 'react'
import { type AppRouter } from '@/server/api/root'
import { getUrl, transformer } from './shared'

/** Use of createTRPCReact function required for react query integration
 * @source https://trpc.io/docs/client/react/setup#2-import-your-approuter
 */
export const api = createTRPCReact<AppRouter>()

export function TRPCReactProvider(props: {
  children: React.ReactNode
  cookies: string
}) {
  const [queryClient] = useState(() => new QueryClient())

  const [trpcClient] = useState(() =>
    api.createClient({
      /*
        "You are able to serialize the response data & input args.
        The transformers need to be added both to the server and the client."
        https://trpc.io/docs/server/data-transformers
      */
      transformer,
      links: [
        /*
         "loggerLink is a link that lets you implement a logger for your tRPC client."
         https://trpc.io/docs/v10/client/links/loggerLink
        */
        loggerLink({
          enabled: (
            op /* "op which is the Operation that is being executed by the client"
            https://trpc.io/docs/v10/client/links#creating-a-custom-link*/,
          ) =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        /**
          "unstable_httpBatchStreamLink is a terminating link that batches an array of individual tRPC operations
          into a single HTTP request that's sent to a single tRPC procedure (equivalent to httpBatchLink),
          but doesn't wait for all the responses of the batch to be ready and streams the responses as soon as any data is available."
          https://trpc.io/docs/client/links/httpBatchStreamLink
        */
        unstable_httpBatchStreamLink({
          // url required
          url: getUrl(),
          // "Http headers" http://trpc.io/docs/v10/header
          headers() {
            return {
              cookie: props.cookies,
              'x-trpc-source': 'react',
            }
          },
        }),
      ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  )
}
