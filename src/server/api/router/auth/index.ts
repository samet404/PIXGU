import { createTRPCRouter } from '@/server/api/trpc'
import {
  getSession,
  getUser,
  getUserBySelecting,
  getUserID,
  isLogged,
} from './subroute/_index'

export const authRouter = createTRPCRouter({
  getSession: getSession,
  getUser: getUser,
  getUserID: getUserID,
  isLogged: isLogged,
  getUserBySelecting: getUserBySelecting,
})
