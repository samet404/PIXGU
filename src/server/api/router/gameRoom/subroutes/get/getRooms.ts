import { loggedUserProducure } from '@/procedure'

export const getRooms = loggedUserProducure.query(async ({ ctx }) => {
  const activeRooms = await ctx.redisDb.smembers('active_rooms')

  const rooms = await Promise.all(
    activeRooms.map(async (roomID) => {
      return {
        ID: roomID,
        name: await ctx.redisDb.get<string>(`room:${roomID}:name`),
        isPublic: !(await ctx.redisDb.get(`room:${roomID}:password`)),
        createdAt: await ctx.redisDb.get<Date>(`room:${roomID}:created_at`),
      }
    }),
  )

  return rooms.sort((a, b) => {
    if (!a.createdAt || !b.createdAt) return a.ID.localeCompare(b.ID)

    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)
    return dateA.getTime() - dateB.getTime()
  })
})
