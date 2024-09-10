import { z } from 'zod'
import { publicProcedure } from '../../../trpc'
import { article } from '@/schema/article'
import { eq } from 'drizzle-orm'

export const getByID = publicProcedure
  .input(z.string().cuid2())
  .query(async ({ ctx, input }) => {
    const articleResult = await ctx.db
      .select()
      .from(article)
      .where(eq(article.id, input))
      .limit(1)

    const firstArticle = articleResult[0]

    return firstArticle
  })
