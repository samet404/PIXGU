import { createTRPCRouter } from '../../trpc'
import { createRoom, getRoomsByOffsetAndLimit } from './subroutes/_routes'

export const gameRoomRouter = createTRPCRouter({
  create: createRoom,
  getRoomsByOffsetAndLimit: getRoomsByOffsetAndLimit,
})
