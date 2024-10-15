import { createTRPCRouter } from '../../trpc'
import {
  isRoomHavePassword,
  knowRoomPass,
  getPlayingRooms,
  isExits,
  getThemes,
  getCreatedRoom,
  getCreatedRoomsIDs,
  killRoom,
  getRandomRoomID,
  getRandomPublicRoomID,
  getActiveRoomsID,
  getRoomByID,
} from './subroutes'

export const gameRoomRouter = createTRPCRouter({
  killRoom,

  getByID: getRoomByID,
  getActiveRoomsID,
  getRandomRoomID,
  getRandomPublicRoomID,
  getCreatedRoomsIDs,
  getCreatedRoom,
  getPlayingRooms,
  getThemes,

  isHavePass: isRoomHavePassword,

  knowPass: knowRoomPass,

  isExits,
})
