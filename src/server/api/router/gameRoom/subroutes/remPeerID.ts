import { loggedUserProducure } from '@/procedure'
import { publicProcedure } from '@/server/api/trpc'
import { z } from 'zod'

export const remPeerID = publicProcedure
  .input(
    z.object({
      peerID: z.string(),
      roomID: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { peerID, roomID } = input

    await ctx.redisDb.srem(`gameRoom:${roomID}:peerIDs`, peerID)
  })
