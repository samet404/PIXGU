import { publicProcedure } from '@/server/api/trpc'

export const getUser = publicProcedure.query(({ ctx }) => ctx.user)
