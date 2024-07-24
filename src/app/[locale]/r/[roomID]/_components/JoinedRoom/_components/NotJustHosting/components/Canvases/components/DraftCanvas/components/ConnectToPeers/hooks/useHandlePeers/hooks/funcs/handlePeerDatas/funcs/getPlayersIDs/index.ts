import type { WebRTCConnData } from '@/types'

export const getPlayersIDs = (
  rtcData: WebRTCConnData,
  updatePlayersIDsState: (newIDs: string[]) => void,
) => {
  if (rtcData.event !== 'playersIDsOrderedByTimestamp') return null
  updatePlayersIDsState(rtcData.data.playersIDs)
}
