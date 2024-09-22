import { createTRPCRouter } from '../../trpc'
import { getByID } from '../article/subroutes'
import {
  createRoom,
  isRoomHavePassword,
  knowRoomPass,
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
  getActiveRoomsID,
  getRoomByID,
} from './subroutes'

export const gameRoomRouter = createTRPCRouter({
  create: createRoom,
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

  sendSignalDataToHost,
  sendSignalDataToPlayer,
})
