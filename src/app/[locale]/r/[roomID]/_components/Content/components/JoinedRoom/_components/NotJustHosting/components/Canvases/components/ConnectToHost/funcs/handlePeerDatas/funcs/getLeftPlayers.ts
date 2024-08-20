import type { WebRTCConnData } from '@/types'
import { usePlayers } from '@/zustand/store'

export const getLeftPlayers = (rtcData: WebRTCConnData) => {
  const { from, event, data } = rtcData
  if (event === 'playerLeft' && from == 'host')
    usePlayers.getState().removePlayer(data.ID)
}
