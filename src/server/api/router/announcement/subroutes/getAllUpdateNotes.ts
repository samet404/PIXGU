import { updateNote } from '@/schema/updateNote'
import { publicProcedure } from '../../../trpc'

export const getAllUpdateNotes = publicProcedure.query(
  async ({ ctx }) => await ctx.db.select().from(updateNote),
)
