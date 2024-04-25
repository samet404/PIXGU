import { createTRPCRouter } from '../../trpc'
import {
  createRoom,
  getRoomsByOffsetAndLimit,
  isRoomHavePassword,
  isRoomPassTrue,
  joinRoom,
  leaveRoom,
  getPlayingRooms,
  getRoomUsers,
  startRoomTimer,
} from './subroutes/_routes'

export const gameRoomRouter = createTRPCRouter({
  create: createRoom,
  startRoomTimer: startRoomTimer,

  getRoomsByOffsetAndLimit: getRoomsByOffsetAndLimit,
  getPlayingRooms: getPlayingRooms,

  isHavePass: isRoomHavePassword,

  isRoomPassTrue: isRoomPassTrue,
  join: joinRoom,
  leave: leaveRoom,

  getUsers: getRoomUsers,
})
