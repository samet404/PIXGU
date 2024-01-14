import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { z } from 'zod'
import { db } from '@/db'

import { user } from '@/schema/auth'
import { eq } from 'drizzle-orm'
import { auth } from '@/auth/lucia'

export const userRouter = createTRPCRouter({
  getUserById: publicProcedure
    .input(
      z.string({
        invalid_type_error: 'Input Type Error: Expected input type is string',
      }),
    )
    .query(async (opts) => {
      const userResult = await db
        .select()
        .from(user)
        .where(eq(user.id, opts.input))

      return userResult
    }),

  getSession: publicProcedure.query(async (opts) => {
    // @ts-ignore
    return opts.ctx
  }),

  //   hello: publicProcedure
  //     .input(z.object({ text: z.string() }))
  //     .query(({ input }) => {
  //       return {
  //         greeting: `Hello ${input.text}`,
  //       };
  //     }),
  //   create: publicProcedure
  //     .input(z.object({ name: z.string().min(1) }))
  //     .mutation(async ({ ctx, input }) => {
  //       // simulate a slow db call
  //       await new Promise((resolve) => setTimeout(resolve, 1000));
  //       await ctx.db.insert(posts).values({
  //         name: input.name,
  //       });
  //     }),
  //   getLatest: publicProcedure.query(({ ctx }) => {
  //     return ctx.db.query.posts.findFirst({
  //       orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  //     });
  //   }),
})
