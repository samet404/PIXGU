import { loggedUserProducure } from '@/procedure'
import { gameRoom } from '@/schema/gameRoom'
import { eq } from 'drizzle-orm'
import z from 'zod'

export const getRooms = loggedUserProducure
  .input(
    z.object({
      name: z.string().nullish(),
      offset: z.number().max(50).min(0).default(0),
      limit: z.number().max(10).min(1).default(10),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { name, offset, limit } = input

    if (name) {
      const rooms = await ctx.db
        .select({
          ID: gameRoom.ID,
          name: gameRoom.name,
        })
        .from(gameRoom)
        .where(eq(gameRoom.name, name))
        .limit(limit)
        .offset(offset)

      return rooms
    }

    const rooms = await ctx.db
      .select({
        ID: gameRoom.ID,
        name: gameRoom.name,
      })
      .from(gameRoom)
      .limit(limit)
      .offset(offset)

    return rooms
  })
