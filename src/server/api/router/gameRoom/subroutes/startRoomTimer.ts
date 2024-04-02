import { loggedUserProducure } from '@/procedure'
import { gameRoom } from '@/schema/gameRoom'
import { asyncTimeout, mToMs, sToMs } from '@/utils/_index'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const startRoomTimer = loggedUserProducure
  .input(
    z.object({
      roomID: z.string().max(128),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { roomID } = input
 
    asyncTimeout(mToMs(10))
    await ctx.db.delete(gameRoom).where(eq(gameRoom.ID, roomID))
  })
