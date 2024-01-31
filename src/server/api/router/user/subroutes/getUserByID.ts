import { z } from 'zod'
import { publicProcedure } from '../../../trpc'
import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'

export const getUserByID = publicProcedure
  .input(
    z.string({
      invalid_type_error: 'Input Type Error: Expected input type is string',
    }),
  )
  .query(async ({ ctx, input }) => {
    const userResult = await ctx.db
      .select()
      .from(user)
      .where(eq(user.id, input))
      .limit(1)

    return userResult[0]
  })
