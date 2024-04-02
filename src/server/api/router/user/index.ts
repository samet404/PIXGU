import { createTRPCRouter } from '@/server/api/trpc'
import {
  generateNewUsernameID,
  getFriends,
  getUserByID,
  getUserByUsername,
  getUserByUsernameID,
  getUserByUsernameWithUsernameID,
  sendFriendRequest,
  getFriendRequests,
  declineIncomingFriendRequest,
  acceptIncomingFriendRequest,
  isUserExitsByID,
  isFriendExitsByID,
  isUserExitsByUsernameWithUsernameID,
  isFriendExitsByUsernameWithUsernameID,
  getFirstFriendUsernameWithUsernameID,
  getFirstFriend,
  getFirstFriendByUsernameWithUsernameID,
  isHaveFriend,
  getUserByUsernameAndUsernameID,
  getFriendByFriendID,
} from './subroute/_routes'

export const userRouter = createTRPCRouter({
  generateNewUsernameID: generateNewUsernameID,
  getById: getUserByID,
  getByUsername: getUserByUsername,
  getByUsernameID: getUserByUsernameID,
  isExitsByID: isUserExitsByID,
  isExitsByUsernameWithUsernameID: isUserExitsByUsernameWithUsernameID,

  getByUsernameWithUsernameID: getUserByUsernameWithUsernameID,
  getByUsernameAndUsernameID: getUserByUsernameAndUsernameID,

  isHaveFriend: isHaveFriend,
  getFriends: getFriends,
  getFirstFriend: getFirstFriend,
  getFirstFriendUsernameWithUsernameID: getFirstFriendUsernameWithUsernameID,
  getFirstFriendByUsernameWithUsernameID:
    getFirstFriendByUsernameWithUsernameID,
  getFriendByFriendID: getFriendByFriendID,

  isFriendExitsByID: isFriendExitsByID,
  isFriendExitsByUsernameWithUsernameID: isFriendExitsByUsernameWithUsernameID,

  sendFriendRequest: sendFriendRequest,
  declineIncomingFriendRequest: declineIncomingFriendRequest,
  acceptIncomingFriendRequest: acceptIncomingFriendRequest,
  getFriendRequests: getFriendRequests,
})
