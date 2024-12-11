import type { PlayerJoined } from '@/types'
import { filterObj } from '@/utils/filterObj'
import { usePlayers, type Player } from '@/zustand/store'

export const getJoinedPlayers = (data: PlayerJoined['data']) => {
  const isGuest = 'ID' in data
  const ID = isGuest ? data.ID : data.id
  const player = filterObj(
    data,
    ([key, value]) => key !== 'isSpectator',
  ) as Player

  console.log('player count: ', usePlayers.getState().value.count)

  usePlayers.getState().addPlayer(ID, player)
}
