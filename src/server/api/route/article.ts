import { article } from '@/schema/article'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const articleRouter = createTRPCRouter({
  getArticleById: publicProcedure
    .input(z.string().cuid2())
    .query(async ({ ctx, input }) => {
      const articleResult = await ctx.db
        .select()
        .from(article)
        .where(eq(article.id, input))
        .limit(1)

      if (!articleResult)
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `❌ no articles related to the specified id found | specified id: ${input}`,
        })

      const firstArticle = articleResult[0]

      const articleSchema = z.object({
        id: z.string().cuid2(),
        headerText: z.string(),
        content: z.string(),
      })

      return firstArticle
    }),
})
