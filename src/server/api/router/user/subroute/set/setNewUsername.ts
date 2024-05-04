import { loggedUserProducure } from '@/procedure'
import { z } from 'zod'
import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'

export const setNewUsername = loggedUserProducure
  .input(
    z.object({
      newUsername: z.string().min(1),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const userID = ctx.user.id
    const usernameID = ctx.user.usernameID
    const { newUsername } = input

    const sameNameUser = await ctx.db
      .select()
      .from(user)
      .where(eq(user.usernameWithUsernameID, `${newUsername}@${usernameID}`))

    if (sameNameUser[0])
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Username already taken',
      })

    await ctx.db
      .update(user)
      .set({
        username: newUsername,
        usernameWithUsernameID: `${newUsername}@${usernameID}`,
      })
      .where(eq(user.id, userID))
  })
