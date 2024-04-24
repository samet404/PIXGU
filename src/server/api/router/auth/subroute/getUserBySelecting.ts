import { DatabaseUser } from '@/auth/types'
import { publicProcedure } from '@/server/api/trpc'
import { filterObj } from '@/utils/_index'
import { z } from 'zod'

export const getUserBySelecting = publicProcedure
  .input(
    z.object({
      id: z.boolean().nullish(),
      profilePicture: z.boolean().nullish(),
      username: z.boolean().nullish(),
      usernameID: z.boolean().nullish(),
      usernameWithUsernameID: z.boolean().nullish(),
    }),
  )
  .query(({ input, ctx }) => {
    if (!ctx.user) return null

    const user = ctx.user

    const filtered = filterObj(user, ([k, v]) => (input[k] ? true : false))

    return filtered
  })
