import { createTRPCRouter } from '@/server/api/trpc'
import {
  getSession,
  getUser,
  getUserBySelecting,
  getUserID,
  isLogged,
  isJoined,
} from './subroute/_index'

export const authRouter = createTRPCRouter({
  getSession,
  getUser,
  getUserID,
  isLogged,
  isJoined,
  getUserBySelecting,
})
