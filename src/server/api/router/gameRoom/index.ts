import { createTRPCRouter } from '../../trpc'
import {
  isRoomHavePassword,
  isExits,
  getThemes,
  getCreatedRoom,
  getCreatedRoomsIDs,
  getRandomRoomID,
  getRandomPublicRoomID,
  getActiveRoomsID,
  getRoomByID,
} from './subroutes'

export const gameRoomRouter = createTRPCRouter({
  getByID: getRoomByID,
  getActiveRoomsID,
  getRandomRoomID,
  getRandomPublicRoomID,
  getCreatedRoomsIDs,
  getCreatedRoom,
  getThemes,


  isHavePass: isRoomHavePassword,

  isExits,
})
