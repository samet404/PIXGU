import type { WebRTCConnData } from '@/types'

import { useRoomPlayersDbInfo } from '@/zustand/store/useRoomPlayersDbInfo'
export const getLeftPlayers = (rtcData: WebRTCConnData) => {
  const { from, event, data } = rtcData
  if (event === 'playerLeft' && from == 'host')
    useRoomPlayersDbInfo.setState({
      players: useRoomPlayersDbInfo
        .getState()
        .players.filter((player) => player.ID !== data.ID),
    })
}
