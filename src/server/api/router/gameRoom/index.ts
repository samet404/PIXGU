import { createTRPCRouter } from '../../trpc'
import {
  createRoom,
  getRoomsByOffsetAndLimit,
  isRoomHavePassword_ByID,
  ifPassTrueJoinToRoom_ByIDAndPass,
  getPlayingRoom,
  setPlayingRoomIDToNull,
  getPlayingRoomUsers,
  joinRoom,
} from './subroutes/_routes'

export const gameRoomRouter = createTRPCRouter({
  create: createRoom,

  getRoomsByOffsetAndLimit: getRoomsByOffsetAndLimit,
  getPlayingRoom: getPlayingRoom,

  isHavePass_ByID: isRoomHavePassword_ByID,

  ifPassTrueJoinToRoom_ByIDAndPass: ifPassTrueJoinToRoom_ByIDAndPass,
  joinRoom: joinRoom,

  setPlayingRoomIDToNull: setPlayingRoomIDToNull,
  getPlayingRoomUsers: getPlayingRoomUsers,
})
