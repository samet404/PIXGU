import { publicProcedure } from '@/server/api/trpc'

export const isLogged = publicProcedure.query(
  ({ ctx }) => ctx.session ?? ctx.user ?? false,
)
