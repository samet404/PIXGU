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
} from './subroute/_index'

export const authRouter = createTRPCRouter({
  getSession,
  getGuest,
  getJoinedUserID,
  getUser,
  getUserID,
  isLogged,
  isJoined,
  getUserBySelecting,
})
