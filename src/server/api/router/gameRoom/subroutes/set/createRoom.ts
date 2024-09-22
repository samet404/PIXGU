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
        .max(20)
        .refine((v) => v.trim() !== '', {
          message: 'Name cannot be empty string',
        }),
      password: z
        .string()
        .min(1)
        .max(50)
        .refine((v) => v.trim() !== '', {
          message: 'Name cannot be empty string',
        })
        .nullish(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    console.log('ip:', ctx.clientIP)
    const userID = ctx.user.id
    const createdRooms = await ctx.redisDb.scard(`user:${userID}:created_rooms`)

    if (createdRooms >= 4)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You have reached the maximum number of rooms',
      })

    const createdAt = new Date()
    const { name, password } = input

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

    const { lookupCity } = await import('@/geoIP')
    const geoIP = await lookupCity(ctx.clientIP)

    if (!geoIP)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Geolocation information not found',
      })

    const ll = [geoIP.location.latitude, geoIP.location.longitude]
    const country = geoIP.country.iso_code

    await ctx.redisDb.set(`room:${roomID!}:name`, name)
    await ctx.redisDb.sadd(`room:${roomID!}:admins`, userID)
    await ctx.redisDb.sadd(`room:${roomID!}:active_players`, userID)
    await ctx.redisDb.set(`room:${roomID!}:created_at`, createdAt.toString())
    await ctx.redisDb.set(`room:${roomID!}:host_ID`, userID)
    await ctx.redisDb.set(`room:${roomID!}:host_country`, country)
    await ctx.redisDb.set(`room:${roomID!}:host_LL`, JSON.stringify(ll))
    await ctx.redisDb.sadd(`user:${userID}:created_rooms`, roomID!)
    await ctx.redisDb.set(`room:${roomID!}:`, ctx.clientIP)

    if (password) {
      await ctx.redisDb.set(`room:${roomID!}:password`, password)
      await ctx.redisDb.sadd(`room:${roomID!}:players_known_pass`, userID)
    } else {
      await ctx.redisDb.sadd(`active_public_rooms`, roomID!)
    }

    return {
      createdRoomID: roomID!,
    }
  })
