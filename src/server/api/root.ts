// https://trpc.io/docs/server/routers#defining-a-router

import { userRouter } from '@/server/api/router/user'
import { createTRPCRouter } from '@/server/api/trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
})

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter
