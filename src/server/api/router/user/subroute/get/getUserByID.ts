import { z } from 'zod'
import { publicProcedure } from '@/server/api/trpc'
import { user } from '@/schema/user'
import { eq } from 'drizzle-orm'

/**
 * Get user by ID
 *
 * @param input - ID of the user
 *
 *  ### OR
 *
 * @param withConfigObj - Object with ID of the user and config
 *
 * @example
 *
 * const user = await api.user.getById('id')
 *
 * const user = await api.user.getById({ ID: 'ds02mao', config: { username: false } })
 *
 */
export const getUserByID = publicProcedure
  .input(
    z.string().or(
      z.object({
        ID: z.string(),
        config: z.object({
          username: z.boolean().default(true),
          usernameID: z.boolean().default(true),
          usernameWithUsernameID: z.boolean().default(true),
          profilePicture: z.boolean().default(true),
        }),
      }),
    ),
  )
  .query(async ({ ctx, input }) => {
    if (typeof input === 'object') {
      const id = input.ID
      const { username, usernameID, usernameWithUsernameID, profilePicture } =
        input.config

      const result = (
        await ctx.db
          .select({
            ...(username ? { username: user.username } : {}),
            ...(usernameID ? { usernameID: user.usernameID } : {}),
            ...(usernameWithUsernameID
              ? { usernameWithUsernameID: user.usernameWithUsernameID }
              : {}),
            ...(profilePicture ? { profilePicture: user.profilePicture } : {}),
          })
          .from(user)
          .where(eq(user.id, id))
          .limit(1)
      )[0]

      return result
    }

    const result = (
      await ctx.db
        .select({
          username: user.username,
          usernameID: user.usernameID,
          usernameWithUsernameID: user.usernameWithUsernameID,
          profilePicture: user.profilePicture,
        })
        .from(user)
        .where(eq(user.id, input))
        .limit(1)
    )[0]

    return result
  })
