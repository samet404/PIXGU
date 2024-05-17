import { createTRPCRouter } from '../../trpc'
import {
  createRoom,
  getRooms,
  isRoomHavePassword,
  knowRoomPass,
  joinRoom,
  getPlayingRooms,
  isExits,
  isUserKnowRoomPass,
} from './subroutes/_routes'

export const gameRoomRouter = createTRPCRouter({
  create: createRoom,

  getRooms: getRooms,
  getPlayingRooms: getPlayingRooms,

  isHavePass: isRoomHavePassword,
  isUserKnowPass: isUserKnowRoomPass,

  knowPass: knowRoomPass,
  join: joinRoom,

  isExits: isExits,
})
