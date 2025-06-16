import { joinedUserProducure } from '@/procedure'

export const getJoinedUserID = joinedUserProducure.query(({ ctx }) =>
  ctx.isGuest ? ctx.guest!.ID : null,
)
