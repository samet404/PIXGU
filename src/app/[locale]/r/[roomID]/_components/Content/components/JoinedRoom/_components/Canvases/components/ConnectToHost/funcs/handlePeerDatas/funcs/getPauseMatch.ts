import type { WebRTCConnData } from '@/types/webRTCConnData'
import { useIsGamePaused } from '@/zustand/store'

export const getPauseMatch = (rtcData: WebRTCConnData, userID: string) => {
  if (rtcData.event !== 'pauseMatch' || rtcData.from !== 'host') return

  useIsGamePaused.getState().set({
    isPaused: true,
    code: rtcData.data,
  })
}
