import { createTRPCRouter } from '../../trpc'
import {
  createRoom,
  getRooms,
  isRoomHavePassword,
  knowRoomPass,
  joinRoom,
  getPlayingRooms,
  isExits,
  sendSignalDataToHost,
  sendSignalDataToPlayer,
} from './subroutes'

export const gameRoomRouter = createTRPCRouter({
  create: createRoom,

  getRooms: getRooms,
  getPlayingRooms: getPlayingRooms,

  isHavePass: isRoomHavePassword,

  knowPass: knowRoomPass,
  join: joinRoom,

  isExits: isExits,

  sendSignalDataToHost: sendSignalDataToHost,
  sendSignalDataToPlayer: sendSignalDataToPlayer,
})
