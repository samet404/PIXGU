import type { PrevPlayers } from '@/types'
import { usePlayers } from '@/zustand/store/usePlayers'

export const getPrevPlayers = (data: PrevPlayers['data'], userID: string) => {
  const addPlayer = usePlayers.getState().addPlayer

  Object.keys(data).forEach((key) => {
    if (key === userID) return
    addPlayer(key, data[key]!)
  })
}
