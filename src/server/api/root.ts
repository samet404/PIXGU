// https://trpc.io/docs/server/routers#defining-a-router

import { createTRPCRouter } from '@/server/api/trpc'

import { userRouter } from './router/user'
import { articleRouter } from './router/article'
import { gameRoomRouter } from './router/gameRoom'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  article: articleRouter,
  gameRoom: gameRoomRouter,
})

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter
