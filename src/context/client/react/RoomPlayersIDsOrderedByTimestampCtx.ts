import { createContext } from 'react'

export const RoomPlayersIDsOrderedByTimestampCtx = createContext<{
  value: string[]
}>({
  value: [],
})
