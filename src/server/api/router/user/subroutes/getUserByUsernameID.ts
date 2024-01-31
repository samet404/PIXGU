import { z } from 'zod'
import { publicProcedure } from '../../../trpc'
import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'

export const getUserByUsernameID = publicProcedure
  .input(
    z.string({
      invalid_type_error: 'Input Type Error: Expected input type is string',
    }),
  )
  .query(async ({ ctx, input }) => {
    const userResult = await ctx.db
      .select()
      .from(user)
      .where(eq(user.usernameID, input))

    return userResult
  })
