import type { WebRTCConnData } from '@/types'
import { useIsGamePaused, usePlayers } from '@/zustand/store'

export const getLeftPlayers = (rtcData: WebRTCConnData) => {
  const { from, event } = rtcData
  if (event === 'playerLeft' && from === 'host') {
    const { data } = rtcData

    usePlayers.getState().removePlayer(data.ID)
    useIsGamePaused.getState().set({
      isPaused: true,
      code: 'waitingForPlayersToJoin',
    })
  }
}
