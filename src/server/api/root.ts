// https://trpc.io/docs/server/routers#defining-a-router

import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc'

import {
  userRouter,
  authRouter,
  gameRoomRouter,
  settingsRouter
} from './router'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  settings: settingsRouter,
  gameRoom: gameRoomRouter,
})

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
