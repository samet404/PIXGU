// https://trpc.io/docs/server/routers#defining-a-router

import { createTRPCRouter } from '@/server/api/trpc'

import { userRouter } from './route/user'
import { articleRouter } from './route/article'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  article: articleRouter,
})

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter
