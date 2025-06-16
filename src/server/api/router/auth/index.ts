import { createTRPCRouter } from '@/server/api/trpc'
import {
  isLogged,
  isJoined,
  getGuest,
  getJoinedUserID,
  getCuid2,
} from './subroute/_index'

export const authRouter = createTRPCRouter({
  getGuest,
  getJoinedUserID,
  getCuid2,
  isLogged,
  isJoined,
})
