import type { PlayerJoined } from '@/types'
import { useCoins, usePlayers, usePlayersWhoGaveUp } from '@/zustand/store'

export const getJoinedPlayers = (data: PlayerJoined['data']) => {
  const isGuest = 'ID' in data
  const ID = (isGuest ? data.ID : data.id) as string

  usePlayersWhoGaveUp.getState().initPlayer(ID)
  useCoins.getState().initUser(ID)
  usePlayers.getState().addPlayer(ID, {
    ...data
  })
}
