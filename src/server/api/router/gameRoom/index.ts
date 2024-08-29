import { createTRPCRouter } from '../../trpc'
import {
  createRoom,
  isRoomHavePassword,
  knowRoomPass,
  joinRoom,
  getPlayingRooms,
  isExits,
  sendSignalDataToHost,
  sendSignalDataToPlayer,
  getThemes,
} from './subroutes'

export const gameRoomRouter = createTRPCRouter({
  create: createRoom,

  getPlayingRooms,
  getThemes,

  isHavePass: isRoomHavePassword,

  knowPass: knowRoomPass,
  join: joinRoom,

  isExits,

  sendSignalDataToHost,
  sendSignalDataToPlayer,
})
