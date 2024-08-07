import { type AppRouter } from '@/server/api/root'
import {
  createTRPCProxyClient,
  loggerLink,
  unstable_httpBatchStreamLink,
} from '@trpc/client'
import { getUrl, transformer } from './shared'

export const api = createTRPCProxyClient<AppRouter>({
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
          'x-trpc-source': 'vanilla client',
        }
      },
    }),
  ],
})
