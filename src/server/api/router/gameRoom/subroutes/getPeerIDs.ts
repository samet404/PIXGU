import { loggedUserProducure } from '@/procedure';
import { publicProcedure } from '@/server/api/trpc';
import { z } from 'zod';

export const getPeerIDs = publicProcedure.input(z.object({
    roomID: z.string()
})).query(async ({ input, ctx }) => {
    const { roomID } = input;

    const peerIDs = await ctx.redisDb.smembers(`gameRoom:${roomID}:peerIDs`)
    
    return peerIDs
})