import { joinedUserProducure } from '@/procedure'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const getActiveRoomsID = joinedUserProducure
  .input(
    z.object({
      sortBy: z.object({
        type: z.enum(['distance', 'createdAt']),
        direction: z.enum(['asc', 'desc']),
      }),
    }),
  )
  .query(async ({ input, ctx }) => {
    const roomsIDs = await ctx.redisDb.smembers('active_public_rooms')
    console.log(roomsIDs)
    const sortBy = input.sortBy

    switch (sortBy.type) {
      case 'distance': {
        const { lookupCity } = await import('@/geoIP')
        const geoIP = await lookupCity(ctx.clientIP)

        if (!geoIP)
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Geolocation information not found',
          })

        const myLl = [geoIP.location.latitude, geoIP.location.longitude] as [
          number,
          number,
        ]

        const roomIDsWithDistance = await Promise.all(
          roomsIDs.map(async (ID) => {
            const hostLL = await ctx.redisDb.get(`room:${ID}:host_LL`)

            if (!hostLL)
              throw new TRPCError({
                code: 'NOT_FOUND',
                message: `HOST LL AT NOT FOUND FOR ${ID}`,
              })

            const parsedHostLL: [number, number] = JSON.parse(hostLL)
            const haversine = (await import('haversine-distance')).default
            const distanceInMeters = haversine(myLl, parsedHostLL)
            const distanceInKm = distanceInMeters / 1000

            return {
              ID,
              distanceInKm,
            }
          }),
        )

        const abDirection = (a: number, b: number) =>
          sortBy.direction === 'asc' ? a - b : b - a

        const sortedRoomIDs = roomIDsWithDistance
          .sort((a, b) => abDirection(a.distanceInKm, b.distanceInKm))
          .map((room) => room.ID)

        return sortedRoomIDs
      }

      case 'createdAt': {
        const roomIDsWithCreatedAt = await Promise.all(
          roomsIDs.map(async (ID) => {
            const createdAt = await ctx.redisDb.get(`room:${ID}:created_at`)

            if (!createdAt)
              throw new TRPCError({
                code: 'NOT_FOUND',
                message: `CREATED AT NOT FOUND FOR ${ID}`,
              })

            return {
              ID,
              createdAt: new Date(createdAt),
            }
          }),
        )

        const abDirection = (a: number, b: number) =>
          sortBy.direction === 'asc' ? a - b : b - a

        const sortedRoomIDs = roomIDsWithCreatedAt
          .sort((a, b) =>
            abDirection(
              new Date(a.createdAt).getTime(),
              new Date(b.createdAt).getTime(),
            ),
          )
          .map((room) => room.ID)

        return sortedRoomIDs
      }
    }
  })
