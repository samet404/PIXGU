import { z } from 'zod'
import { createTRPCRouter } from '../trpc'
import { loggedUserProducure } from '../procedure'
import { gameRoom } from '@/schema/gameRoom/gameRoom'

export const gameRoomRouter = createTRPCRouter({
  create: loggedUserProducure
    .input(
      z.object({
        name: z.string().min(1).max(255),
        minPlayers: z.number().min(2).max(16),
        maxPlayers: z.number().min(2).max(16),
        password: z.string().max(255).nullish(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const a = await ctx.db.insert(gameRoom).values({
        name: input.name,
        minPlayers: input.minPlayers,
        maxPlayers: input.maxPlayers,
        password: input.password,
      })

      console.log(a)
    }),

  getRoomsByOffsetAndLimit: loggedUserProducure
    .input(
      z.object({
        offset: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const rooms = await ctx.db
        .select({
          id: gameRoom.ID,
          name: gameRoom.name,
        })
        .from(gameRoom)
        .limit(10)
        .offset(input.offset)

      return rooms
    }),
})
