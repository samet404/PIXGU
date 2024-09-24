import { loggedUserProducure } from '@/procedure'
import { z } from 'zod'

export const setDeveloperMode = loggedUserProducure
  .input(
    z.object({
      isEnabled: z.boolean(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const { isEnabled } = input

    await ctx.redisDb.set(
      `user:${ctx.user.id}:settings:developer_mode`,
      isEnabled ? 1 : 0,
    )
  })
