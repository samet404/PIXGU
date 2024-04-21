import { z } from 'zod'
import { gameRoom } from '@/schema/gameRoom'
import { loggedUserProducure } from '@/procedure'
import { TRPCError } from '@trpc/server'
import { api } from '@/trpc/server'

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
    const userID = ctx.user.id

    const createdRoom = await ctx.db
      .insert(gameRoom)
      .values({
        name: name,
        minPlayers: minPlayers,
        maxPlayers: maxPlayers,
        password: password,
      })
      .returning({ insertedId: gameRoom.ID })

    if (!createdRoom[0])
      throw new TRPCError({
        message: 'Room connot be created all this we know is that it failed.',
        code: 'UNPROCESSABLE_CONTENT',
      })

    const roomID = createdRoom[0].insertedId

    await ctx.redisDb.sadd(`user:${userID}:playing_rooms`, roomID)

    await ctx.redisDb.set(`room:${roomID}:name`, name)
    await ctx.redisDb.sadd(`room:${roomID}:players`, userID)
    await ctx.redisDb.sadd(`room:${roomID}:admins`, userID)
    await ctx.redisDb.set(`room:${roomID}:password`, password ?? null)
    await ctx.redisDb.set(`room:${roomID}:minPlayers`, minPlayers)
    await ctx.redisDb.set(`room:${roomID}:maxPlayers`, maxPlayers)

    await api.gameRoom.startRoomTimer.mutate({ roomID })

    return roomID
  })
