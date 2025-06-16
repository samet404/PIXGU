import type { PlayerJoined } from '@/types'
import { useCoins } from '@/zustand/store/useCoins'
import { usePlayers } from '@/zustand/store/usePlayers'
import { usePlayersWhoGaveUp } from '@/zustand/store/usePlayersWhoGaveUp'

export const getJoinedPlayers = (data: PlayerJoined['data']) => {
  const isGuest = 'ID' in data
  const ID = (isGuest ? data.ID : data.id) as string

  usePlayersWhoGaveUp.getState().initPlayer(ID)
  useCoins.getState().initUser(ID)
  usePlayers.getState().addPlayer(ID, {
    ...data
  })
}
