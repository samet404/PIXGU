// https://trpc.io/docs/server/routers#defining-a-router

import { db } from '@/db'
import { user } from '@/schema/auth'

import { publicProcedure, router } from './trpc'

export const appRouter = router({
  getUsers: publicProcedure.query(async () => {
    return await db.select().from(user)
  }),
})

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter
