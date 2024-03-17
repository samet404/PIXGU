import { createTRPCRouter } from '../../trpc'
import {
  createRoom,
  getRoomsByOffsetAndLimit,
  isRoomHavePassword_ByID,
  ifPassTrueJoinToRoom_ByIDAndPass,
  getPlayingRoom,
  setPlayingRoomIDToNull,
  getPlayingRoomUsers,
} from './subroutes/_routes'

export const gameRoomRouter = createTRPCRouter({
  create: createRoom,
  getRoomsByOffsetAndLimit: getRoomsByOffsetAndLimit,
  getPlayingRoom: getPlayingRoom,
  isHavePass_ByID: isRoomHavePassword_ByID,
  ifPassTrueJoinToRoom_ByIDAndPass: ifPassTrueJoinToRoom_ByIDAndPass,
  setPlayingRoomIDToNull: setPlayingRoomIDToNull,
  getPlayingRoomUsers: getPlayingRoomUsers,
})
