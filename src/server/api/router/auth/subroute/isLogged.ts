import { publicProcedure } from '@/server/api/trpc'

export const isLogged = publicProcedure.query(
  ({ ctx }) =>
    // We returning false because currently we have no auth mechanism other than guest
    false,
)
