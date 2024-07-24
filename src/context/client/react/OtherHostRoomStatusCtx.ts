import type { OtherRoomStatues } from '@/types/otherRoomStatues'
import { createContext } from 'react'

export const OtherHostRoomStatuesCtx = createContext<OtherRoomStatues>({
  theme: null,
  isMatchPaused: false,
  matchTimeout: null,
  isFirstMatch: false,
  players: {
    info: {},
    count: 0,
    secondPainterIndex: 1,
  },
})
