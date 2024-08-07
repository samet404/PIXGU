import type { RoomPlayersDbInfoOrderedByJoinTime } from '@/types'
import { createContext } from 'react'

export const RoomPlayersDbInfoOrderedByJoinTimeCtx =
  createContext<RoomPlayersDbInfoOrderedByJoinTime>({
    players: {},
    me: null,
  })
