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
} from './subroute'

export const userRouter = createTRPCRouter({
  generateNewUsernameID: generateNewUsernameID,
  getById: getUserByID,
  getByUsername: getUserByUsername,
  getByUsernameID: getUserByUsernameID,

  getByUsernameWithUsernameID: getUserByUsernameWithUsernameID,

  getSession: getSession,

  getFriends: getFriends,
  sendFriendRequest: sendFriendRequest,
  declineIncomingFriendRequest: declineIncomingFriendRequest,
  acceptIncomingFriendRequest: acceptIncomingFriendRequest,
  getFriendRequests: getFriendRequests,
})
