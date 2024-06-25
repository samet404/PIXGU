import { RoomPlayersIDsContext } from '@/context/client/react/roomPlayersIDsContext'
import type { ReactNode } from 'react'

export const RoomPlayersIDs = ({ children }: Props) => {
  return (
    <RoomPlayersIDsContext.Provider
      value={{
        value: [],
      }}
    >
      {children}
    </RoomPlayersIDsContext.Provider>
  )
}

type Props = {
  children: ReactNode
}
