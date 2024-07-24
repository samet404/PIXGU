import { RoomPlayersIDsOrderedByTimestampCtx } from '@/context/client'
import type { ReactNode } from 'react'

export const RoomPlayersIDsOrderedByTimestamp = ({ children }: Props) => {
  return (
    <RoomPlayersIDsOrderedByTimestampCtx.Provider
      value={{
        value: [],
      }}
    >
      {children}
    </RoomPlayersIDsOrderedByTimestampCtx.Provider>
  )
}

type Props = {
  children: ReactNode
}
