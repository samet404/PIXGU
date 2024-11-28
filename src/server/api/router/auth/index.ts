import { createTRPCRouter } from '@/server/api/trpc'
import {
  getSession,
  getUser,
  getUserBySelecting,
  getUserID,
  isLogged,
  isJoined,
  getGuest,
  getJoinedUserID,
  getCuid2,
} from './subroute/_index'

export const authRouter = createTRPCRouter({
  getSession,
  getGuest,
  getJoinedUserID,
  getCuid2,
  getUser,
  getUserID,
  isLogged,
  isJoined,
  getUserBySelecting,
})
