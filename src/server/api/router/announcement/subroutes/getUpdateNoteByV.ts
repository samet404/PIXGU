import { updateNote } from '@/schema/updateNote'
import { publicProcedure } from '../../../trpc'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const getUpdateNoteByV = publicProcedure
  .input(z.string().max(4))
  .query(async ({ input, ctx }) => {
    const data = await ctx.db
      .select()
      .from(updateNote)
      .where(eq(updateNote.IDAndVersion, input))
      .limit(1)

    return data[0]
  })
