import { createTRPCRouter } from '@/server/api/trpc'
import {
  generateNewUsernameID,
  getUserByID,
  getUserByUsername,
  getUserByUsernameID,
  getUserByUsernameWithUsernameID,
  isUserExitsByID,
  getUserByUsernameAndUsernameID,
  setNewUsername,
  setNewLocale,
} from './subroute'

export const userRouter = createTRPCRouter({
  generateNewUsernameID,

  getByID: getUserByID,
  getByUsername: getUserByUsername,
  getByUsernameID: getUserByUsernameID,
  isExitsByID: isUserExitsByID,

  getByUsernameWithUsernameID: getUserByUsernameWithUsernameID,
  getByUsernameAndUsernameID: getUserByUsernameAndUsernameID,


  setNewUsername: setNewUsername,
  setNewLocale: setNewLocale,
})
