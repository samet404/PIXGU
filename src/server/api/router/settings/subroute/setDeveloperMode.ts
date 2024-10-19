import { joinedUserProducure } from '@/procedure'
import { z } from 'zod'

export const setDeveloperMode = joinedUserProducure
  .input(
    z.object({
      isEnabled: z.boolean(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { isEnabled } = input
    const userID = ctx.isGuest ? ctx.guest!.ID : ctx.user!.id

    await ctx.redisDb.set(
      `user:${userID}:settings:developer_mode`,
      isEnabled ? 1 : 0,
    )
  })
