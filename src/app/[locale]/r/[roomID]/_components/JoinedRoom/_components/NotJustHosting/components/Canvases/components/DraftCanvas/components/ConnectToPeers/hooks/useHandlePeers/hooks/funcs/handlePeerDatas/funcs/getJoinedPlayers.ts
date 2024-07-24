import type { WebRTCConnData } from '@/types'

export const getJoinedPlayers = (rtcData: WebRTCConnData) => {
  if (rtcData.event !== 'userJoined' || rtcData.type !== 'directlyFromHost')
    return null
}
