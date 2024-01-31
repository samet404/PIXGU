import { createTRPCRouter } from '@/server/api/trpc'
import {
  generateNewUsernameID,
  getFriends,
  getSession,
  getUserByID,
  getUserByUsername,
  getUserByUsernameID,
  getUserByUsernameWithUsernameID,
} from './subroutes'

export const userRouter = createTRPCRouter({
  generateNewUsernameID: generateNewUsernameID,
  getUserById: getUserByID,
  getUserByUsername: getUserByUsername,
  getUserByUsernameID: getUserByUsernameID,

  getUserByUsernameWithUsernameID: getUserByUsernameWithUsernameID,

  getSession: getSession,
  
  getFriends: getFriends,
})
