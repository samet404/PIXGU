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
  // acceptIncomingFriendRequest,
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
  setNewUsername,
  setNewLocale,
} from './subroute'

export const userRouter = createTRPCRouter({
  generateNewUsernameID,

  getByID: getUserByID,
  getByUsername: getUserByUsername,
  getByUsernameID: getUserByUsernameID,
  isExitsByID: isUserExitsByID,
  isExitsByUsernameWithUsernameID: isUserExitsByUsernameWithUsernameID,

  getByUsernameWithUsernameID: getUserByUsernameWithUsernameID,
  getByUsernameAndUsernameID: getUserByUsernameAndUsernameID,

  // TODO fix friend stuff
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
  // acceptIncomingFriendRequest: acceptIncomingFriendRequest,

  setNewUsername: setNewUsername,
  setNewLocale: setNewLocale,

  getFriendRequests: getFriendRequests,
})
