import { OtherHostRoomStatuesCtx } from '@/context/client'
import type { PropsWithChildren } from 'react'

export const OtherStatues = ({ children }: PropsWithChildren) => (
  <OtherHostRoomStatuesCtx.Provider
    value={{
      theme: null,
      isFirstMatch: false,
      isMatchPaused: false,
      matchTimeout: null,
      players: {
        info: {},
        count: 0,
        secondPainterIndex: 1,
      },
    }}
  >
    {children}
  </OtherHostRoomStatuesCtx.Provider>
)
