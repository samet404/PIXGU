import { publicProcedure } from '@/server/api/trpc'

export const getGuest = publicProcedure.query(async ({ ctx }) => ctx.guest)
