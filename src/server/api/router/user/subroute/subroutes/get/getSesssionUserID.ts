import { publicProcedure } from '../../../../../trpc'

export const getSesssionUserID = publicProcedure.query(({ ctx }) => {
  return ctx.session?.user?.userId as string
})
