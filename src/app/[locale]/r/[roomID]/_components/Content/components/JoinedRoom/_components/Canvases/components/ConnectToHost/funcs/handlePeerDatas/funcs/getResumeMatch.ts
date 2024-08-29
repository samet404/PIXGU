import type { WebRTCConnData } from '@/types/webRTCConnData'
import { useIsGamePaused } from '@/zustand/store'

export const getResumeMatch = (rtcData: WebRTCConnData, userID: string) => {
  if (rtcData.event !== 'resumeMatch' && rtcData.from !== 'host') return

  useIsGamePaused.getState().set({
    isPaused: false,
    code: null,
  })
}
