import { z } from 'zod'
import { gameRoom } from '@/schema/gameRoom'
import { loggedUserProducure } from '@/procedure'
import { eq } from 'drizzle-orm'
import { user } from '@/schema/user'

export const createRoom = loggedUserProducure
  .input(
    z.object({
      name: z.string().min(1).max(255),
      minPlayers: z.number().min(2).max(16),
      maxPlayers: z.number().min(2).max(16),
      password: z.string().max(255).nullish(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { name, minPlayers, maxPlayers, password } = input
    const userID = ctx.session.user.userId

    const createdRoom = await ctx.db
      .insert(gameRoom)
      .values({
        name: name,
        minPlayers: minPlayers,
        maxPlayers: maxPlayers,
        password: password,
      })
      .returning({ insertedId: gameRoom.ID })

    await ctx.db
      .update(user)
      .set({
        playingRoomID: createdRoom[0]!.insertedId,
        isAdminInPlayingRoom: '1',
      })
      .where(eq(user.id, userID))

    return createdRoom[0]
  })
