import { joinedUserProducure } from '@/procedure'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { lookupCity } from '@/db/geoIP'
import { haversineDistance } from '@/utils/haversineDistance'

export const getRoomByID = joinedUserProducure
  .input(z.string())
  .query(async ({ ctx, input: ID }) => {
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

    const hostCountry = (await ctx.redisDb.get(`room:${ID}:host_country`))!
    const hostLLJSON = (await ctx.redisDb.get(`room:${ID}:host_LL`))!
    const hostLL: [number, number] = JSON.parse(hostLLJSON)

    const distanceInMeters = haversineDistance(myLl, hostLL)
    const distanceInKm = parseInt((distanceInMeters / 1000).toFixed(0))
    const name = await ctx.redisDb.get(`room:${ID}:name`)
    if (!name)
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Room not found',
      })

    const isPublic = !(await ctx.redisDb.get(`room:${ID}:password`))
    const createdAt = await ctx.redisDb.get(`room:${ID}:created_at`)
    if (!createdAt)
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Room not found',
      })

    const playerCount = await ctx.redisDb.get(`room:${ID}:total_players`)
    if (!playerCount)
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Room not found' })

    const version = await ctx.redisDb.get(`room:${ID}:version`)
    if (!version)
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Room not found' })

    return {
      ID,
      name,
      isPublic,
      createdAt: new Date(createdAt),
      distanceInKm,
      country: hostCountry,
      playerCount: parseInt(playerCount),
      version
    }
  })
