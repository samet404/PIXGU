import { createTRPCRouter } from '@/server/api/trpc'
import {
  generateNewUsernameID,
  getFriends,
  getUserByID,
  getUserByUsername,
  getUserByUsernameID,
  getUserByUsernameWithUsernameID,
  getSession,
  sendFriendRequest,
  getFriendRequests,
  declineIncomingFriendRequest,
  acceptIncomingFriendRequest,
  getSesssionUserID,
  isUserExitsByID,
  isFriendExitsByID,
  isUserExitsByUsernameWithUsernameID,
  isFriendExitsByUsernameWithUsernameID,
} from './subroute'

export const userRouter = createTRPCRouter({
  generateNewUsernameID: generateNewUsernameID,
  getById: getUserByID,
  getByUsername: getUserByUsername,
  getByUsernameID: getUserByUsernameID,
  isExitsByID: isUserExitsByID,
  isExitsByUsernameWithUsernameID: isUserExitsByUsernameWithUsernameID,

  getByUsernameWithUsernameID: getUserByUsernameWithUsernameID,

  getSession: getSession,
  getSessionUserID: getSesssionUserID,

  getFriends: getFriends,
  isFriendExitsByID: isFriendExitsByID,
  isFriendExitsByUsernameWithUsernameID: isFriendExitsByUsernameWithUsernameID,

  sendFriendRequest: sendFriendRequest,
  declineIncomingFriendRequest: declineIncomingFriendRequest,
  acceptIncomingFriendRequest: acceptIncomingFriendRequest,
  getFriendRequests: getFriendRequests,
})
