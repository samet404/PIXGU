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
  getFirstFriendUsernameWithUsernameID,
  getFirstFriend,
  getFirstFriendByUsernameWithUsernameID,
  isHaveFriend,
  getUserByUsernameAndUsernameID,
  getFriendByFriendID
} from './subroute'

export const userRouter = createTRPCRouter({
  generateNewUsernameID: generateNewUsernameID,
  getById: getUserByID,
  getByUsername: getUserByUsername,
  getByUsernameID: getUserByUsernameID,
  isExitsByID: isUserExitsByID,
  isExitsByUsernameWithUsernameID: isUserExitsByUsernameWithUsernameID,

  getByUsernameWithUsernameID: getUserByUsernameWithUsernameID,
  getByUsernameAndUsernameID: getUserByUsernameAndUsernameID,

  getSession: getSession,
  getSessionUserID: getSesssionUserID,

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
