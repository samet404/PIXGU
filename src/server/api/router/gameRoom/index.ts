import { createTRPCRouter } from '../../trpc'
import {
  createRoom,
  getRoomsByOffsetAndLimit,
  isRoomHavePassword,
  knowRoomPass,
  joinRoom,
  getPlayingRooms,
  isExits,
  isUserKnowRoomPass,
} from './subroutes/_routes'

export const gameRoomRouter = createTRPCRouter({
  create: createRoom,

  getRoomsByOffsetAndLimit: getRoomsByOffsetAndLimit,
  getPlayingRooms: getPlayingRooms,

  isHavePass: isRoomHavePassword,
  isUserKnowPass: isUserKnowRoomPass,

  knowPass: knowRoomPass,
  join: joinRoom,

  isExits: isExits,
})
