import { z } from 'zod'
import { gameRoom } from '@/schema/gameRoom'
import { loggedUserProducure } from '@/procedure'
import { TRPCError } from '@trpc/server'
import { ablyBasicClient } from '@/utils/ablyBasicClient'
import { ablySubscribeOnce } from '@/utils/ablySubscribeOnce'
import { mToMs } from '@/utils/mToMs'

/**
 * Creates a room
 */
export const createRoom = loggedUserProducure
  .input(
    z.object({
      name: z
        .string()
        .min(1)
        .max(255)
        .refine((v) => v.trim() !== '', {
          message: 'Name cannot be empty string',
        }),
      password: z
        .string()
        .min(1)
        .max(255)
        .refine((v) => v.trim() !== '', {
          message: 'Name cannot be empty string',
        })
        .nullish(),
      isHostPlayer: z.boolean(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const createdAt = new Date()
    const { name, password, isHostPlayer } = input
    const userID = ctx.user.id
    const { ablyClient } = await ablyBasicClient()

    // #region sql database
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
    // #endregion

    const roomID = createdRoom[0].insertedId

    // #region redis
    await ctx.redisDb.sadd(`active_rooms`, roomID)
    await ctx.redisDb.set(`room:${roomID}:name`, name)
    await ctx.redisDb.sadd(`room:${roomID}:admins`, userID)
    await ctx.redisDb.set(`room:${roomID}:created_at`, createdAt)
    await ctx.redisDb.set(`room:${roomID}:host_ID`, userID)
    await ctx.redisDb.set(`room:${roomID}:is_host_player`, isHostPlayer)

    if (password) {
      await ctx.redisDb.set(`room:${roomID}:password`, password)
      await ctx.redisDb.sadd(`room:${roomID}:players_known_pass`, userID)
    }
    // #endregion
    // #region external server communication

    const myRoomCreatingChannel = ablyClient.channels.get(
      `room-creating:${roomID}`,
    )

    try {
      await (async () => {
        const { data } = await ablySubscribeOnce(
          myRoomCreatingChannel,
          'answer',
          {
            maxLifetime: mToMs(5),

            doAfterSubscribe: async () => {
              const globalRoomCreatingChannel =
                ablyClient.channels.get(`room-creating`)

              await globalRoomCreatingChannel.publish('DB_RECORDS_CREATED', {
                roomID: roomID,
                createdAt: createdAt,
              })
            },
          },
        )

        if (data === 'SUCCESS')
          console.log(`Server created room ${roomID} successfully`)
        else if (data === 'ERROR') {
          throw new TRPCError({
            message: 'SERVER_ERROR',
            code: 'INTERNAL_SERVER_ERROR',
          })
        } else {
          throw new TRPCError({
            message: 'UNEXPECTED_ANSWER_FROM_SERVER',
            code: 'INTERNAL_SERVER_ERROR',
          })
        }
      })()
    } catch (e) {
      if (e instanceof TRPCError) {
        if (
          e.code === 'INTERNAL_SERVER_ERROR' &&
          e.message === 'SERVER_NOT_RESPONDING'
        ) {
          const { killRoom } = await import('@/utils/server')
          await killRoom(roomID)
        }
      }
    }
    // #endregion

    ablyClient.close()

    return {
      createdRoomID: roomID,
    }
  })
