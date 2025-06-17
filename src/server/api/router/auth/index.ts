import { createTRPCRouter } from '@/server/api/trpc'
import {
  isJoined,
  getGuest,
  getJoinedUserID,
  getCuid2,
} from './subroute/_index'

export const authRouter = createTRPCRouter({
  getGuest,
  getJoinedUserID,
  getCuid2,
  isJoined,
})
