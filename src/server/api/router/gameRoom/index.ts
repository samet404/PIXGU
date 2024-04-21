import { createTRPCRouter } from '../../trpc'
import {
  createRoom,
  getRoomsByOffsetAndLimit,
  isRoomHavePassword,
  joinRoomWithPass,
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

  joinRoomWithPass: joinRoomWithPass,
  join: joinRoom,
  leave: leaveRoom,

  getUsers: getRoomUsers,
})
