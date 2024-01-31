import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'
import { loggedUserProducure } from '../procedure/loggedUser'
import { gameRoom } from '@/schema/gameRoom/gameRoom'
import { eq } from 'drizzle-orm'

export const gameRoomRouter = createTRPCRouter({
  create: publicProcedure
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
        createdById: ctx.session?.user.userId,
      })

      console.log(a)
    }),

  getLatestCreatedRoomId: loggedUserProducure.query(async ({ ctx }) => {
    const room = await ctx.db
      .select({
        id: gameRoom.id,
      })
      .from(gameRoom)
      .where(eq(gameRoom.createdById, ctx.session!.user.userId))
      .limit(1)

    return room
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
          id: gameRoom.id,
          name: gameRoom.name,
        })
        .from(gameRoom)
        .limit(10)
        .offset(input.offset)

      return rooms
    }),
})
