import { createContext } from 'react'

export const RoomPlayersIDsContext = createContext<{
  value: string[]
}>({
  value: [],
})
