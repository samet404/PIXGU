import type { AppRouter } from '@/server/api/root';
import { getBaseUrl } from '@/utils/getBaseUrl';
import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import { createTRPCProxyClient, httpBatchStreamLink, loggerLink } from '@trpc/client';
import SuperJSON from "superjson";

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 30 * 1000,
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  });


export const api = createTRPCProxyClient<AppRouter>({
  /*
        "You are able to serialize the response data & input args.
        The transformers need to be added both to the server and the client."
        https://trpc.io/docs/server/data-transformers
      */
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
    httpBatchStreamLink({
      transformer: SuperJSON,
      url: getBaseUrl() + "/api/trpc",
      headers: () => {
        const headers = new Headers();
        headers.set("x-trpc-source", "nextjs-react");
        return headers;
      },
    }),
  ],
})