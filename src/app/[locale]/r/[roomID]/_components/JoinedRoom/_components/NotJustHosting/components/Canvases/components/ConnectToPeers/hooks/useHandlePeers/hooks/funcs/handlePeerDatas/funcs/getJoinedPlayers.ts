import type { WebRTCConnData } from '@/types'
import { useRoomPlayersDbInfo } from '@/zustand/store/useRoomPlayersDbInfo'

export const getJoinedPlayers = (rtcData: WebRTCConnData) => {
  const { from, event, data } = rtcData
  if (event === 'playerJoined' && from === 'host') {
    useRoomPlayersDbInfo.setState({
      players: [...useRoomPlayersDbInfo.getState().players, data],
    })
  }
}
