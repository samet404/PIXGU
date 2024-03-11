import { loggedUserProducure } from '@/procedure'
import { gameRoom } from '@/schema/gameRoom'
import z from 'zod'

export const getRoomsByOffsetAndLimit = loggedUserProducure
  .input(
    z.object({
      offset: z.number(),
      limit: z.number().max(10).min(1).default(10),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { offset, limit } = input

    const rooms = await ctx.db
      .select({
        id: gameRoom.ID,
        name: gameRoom.name,
      })
      .from(gameRoom)
      .limit(limit)
      .offset(offset)

    return rooms
  })
