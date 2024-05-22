import { z } from 'zod'
import { gameRoom } from '@/schema/gameRoom'
import { loggedUserProducure } from '@/procedure'
import { TRPCError } from '@trpc/server'
import { ablyBasicClient } from '@/utils/ablyBasicClient'
import { sToMs } from '@/utils/sToMs'

export const createRoom = loggedUserProducure
  .input(
    z.object({
      name: z.string().min(1).max(255),
      password: z.string().min(1).max(255).nullish(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const createdAt = new Date()
    const { name, password } = input
    const userID = ctx.user.id
    const { ablyClient } = await ablyBasicClient()

    const createdRoom = await ctx.db
      .insert(gameRoom)
      .values({
        name: name,
        password: password,
        createdAt: createdAt,
      })
      .returning({ insertedId: gameRoom.ID })

    if (!createdRoom[0])
      throw new TRPCError({
        message: 'Room connot be created all this we know is that it failed.',
        code: 'UNPROCESSABLE_CONTENT',
      })

    const roomID = createdRoom[0].insertedId

    await ctx.redisDb.sadd(`active_rooms`, roomID)
    await ctx.redisDb.set(`room:${roomID}:name`, name)
    await ctx.redisDb.sadd(`room:${roomID}:admins`, userID)
    await ctx.redisDb.set(`room:${roomID}:password`, password ?? null)
    await ctx.redisDb.set(`room:${roomID}:created_at`, createdAt)
    await ctx.redisDb.sadd(`room:${roomID}:players_known_pass`, userID)

    const globalRoomCreatingChannel = ablyClient.channels.get(`room-creating`)

    await globalRoomCreatingChannel.publish('DB_RECORDS_CREATED', {
      roomID: roomID,
      createdAt: createdAt,
    })

    const roomCreatingChannel = ablyClient.channels.get(
      `room-creating:${roomID}`,
    )

    try {
      await new Promise((resolve) => {
        const maxRespondTimeout = setTimeout(() => {
          throw new TRPCError({
            message: 'SERVER_NOT_RESPONDING',
            code: 'INTERNAL_SERVER_ERROR',
          })
        }, sToMs(15))

        roomCreatingChannel.subscribe('answer', (msg) => {
          if (msg.data == 'SUCCESS') {
            roomCreatingChannel.unsubscribe()
            clearTimeout(maxRespondTimeout)
            resolve(true)
            console.log(`Server created room ${roomID} successfully`)
          }

          if (msg.data == 'ERROR') {
            roomCreatingChannel.unsubscribe()
            clearTimeout(maxRespondTimeout)
            throw new TRPCError({
              message: 'SERVER_ERROR',
              code: 'INTERNAL_SERVER_ERROR',
            })
          }
        })
      })
    } catch (e) {
      if (e instanceof TRPCError) {
        if (
          e.code === 'INTERNAL_SERVER_ERROR' &&
          e.message === 'SERVER_NOT_RESPONDING'
        ) {
          const { killRoom } = await import('@/utils/server')
          await killRoom(roomID)
        }

        throw new TRPCError({
          message: 'UNEXPECTED_ERROR_WHILE_CREATING_ROOM',
          code: 'INTERNAL_SERVER_ERROR',
        })
      }
    }

    return {
      createdRoomID: roomID,
    }
  })
