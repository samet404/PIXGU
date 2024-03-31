import { publicProcedure } from '@/server/api/trpc'

export const getUserID = publicProcedure.query(({ ctx }) => ctx.user?.id)
