import { z } from 'zod'
import { loggedUserProducure } from '@/procedure'
import { init } from '@paralleldrive/cuid2'
import { TRPCError } from '@trpc/server'

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
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const createdAt = new Date()
    const { name, password } = input
    const userID = ctx.user.id

    const createId = init({
      length: 5,
    })

    let roomID: string
    let isRoomExits = 0
    // #region redis

    while (isRoomExits !== 1) {
      console.log('while')
      try {
        roomID = createId()
        isRoomExits = await ctx.redisDb.sadd(`active_rooms`, roomID)
      } catch (error) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Internal server error in while loop',
        })
      }
    }

    console.log(isRoomExits)

    await ctx.redisDb.set(`room:${roomID!}:name`, name)
    await ctx.redisDb.sadd(`room:${roomID!}:admins`, userID)
    await ctx.redisDb.sadd(`room:${roomID!}:active_players`, userID)
    await ctx.redisDb.set(`room:${roomID!}:created_at`, createdAt)
    await ctx.redisDb.set(`room:${roomID!}:host_ID`, userID)

    if (password) {
      await ctx.redisDb.set(`room:${roomID!}:password`, password)
      await ctx.redisDb.sadd(`room:${roomID!}:players_known_pass`, userID)
    }

    return {
      createdRoomID: roomID!,
    }
  })
