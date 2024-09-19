import { createTRPCRouter } from '../../trpc'
import {
  createRoom,
  isRoomHavePassword,
  knowRoomPass,
  getRooms,
  getPlayingRooms,
  isExits,
  sendSignalDataToHost,
  sendSignalDataToPlayer,
  getThemes,
  getCreatedRoom,
  getCreatedRoomsIDs,
  killRoom,
  getRandomRoomID,
  getRandomPublicRoomID,
} from './subroutes'

export const gameRoomRouter = createTRPCRouter({
  create: createRoom,

  getRandomRoomID,
  getRandomPublicRoomID,
  killRoom,
  getCreatedRoomsIDs,
  getCreatedRoom,
  getPlayingRooms,
  getThemes,

  isHavePass: isRoomHavePassword,

  knowPass: knowRoomPass,
  getRooms: getRooms,

  isExits,

  sendSignalDataToHost,
  sendSignalDataToPlayer,
})
