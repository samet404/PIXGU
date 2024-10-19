import { joinedUserProducure } from '@/procedure'

export const getJoinedUserID = joinedUserProducure.query(async ({ ctx }) =>
  ctx.isGuest ? ctx.guest!.ID : ctx.user!.id,
)
