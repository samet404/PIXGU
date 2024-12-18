import { publicProcedure } from '@/server/api/trpc'

export const getGuest = publicProcedure.query(({ ctx }) => ctx.guest)
