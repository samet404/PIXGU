import { loggedUserProducure } from '@/procedure'
import { gameRoom } from '@/schema/gameRoom'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const isRoomHavePassword = loggedUserProducure
  .input(
    z.object({
      roomID: z.string(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const { roomID } = input

    // get room by id
    const room = await ctx.db
      .select({
        password: gameRoom.password,
      })
      .from(gameRoom)
      .where(eq(gameRoom.ID, roomID))
      .limit(1)

    // return true if room has password
    return !!room[0]?.password
  })
