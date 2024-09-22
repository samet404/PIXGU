import { loggedUserProducure } from '@/procedure'

export const getPlayingRooms = loggedUserProducure.query(async ({ ctx }) => {
  const userID = ctx.user.id
  const roomsIDs = await ctx.redisDb.smembers(`user:${userID}:playing_rooms`)

  const rooms = await Promise.all(
    roomsIDs.map(async (ID) => {
      const name = await ctx.redisDb.get(`room:${ID}:name`)
      if (!name) {
        console.error(`room:${ID}:name is not exits`)
        return null
      }

      const hostID = await ctx.redisDb.get(`room:${ID}:host_ID`)
      if (!hostID) {
        console.error(`room:${ID}:host_ID is not exits`)
        return null
      }

      const isPublic = await ctx.redisDb.get(`room:${ID}:password`)

      const createdAt = await ctx.redisDb.get(`room:${ID}:created_at`)
      if (!createdAt) {
        console.error(`room:${ID}:created_at is not exits`)
        return null
      }

      return {
        ID,
        name: name,
        amIHost: hostID === userID,
        isPublic: !isPublic,
        createdAt: new Date(createdAt),
      }
    }),
  )

  return rooms
    .filter((room) => room !== null)
    .sort((a, b) => {
      if (!a.createdAt || !b.createdAt) return a.ID.localeCompare(b.ID)

      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return dateA.getTime() - dateB.getTime()
    })
})
