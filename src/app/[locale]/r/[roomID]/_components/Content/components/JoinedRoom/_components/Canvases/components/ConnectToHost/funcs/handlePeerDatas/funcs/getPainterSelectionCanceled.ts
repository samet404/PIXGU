import type { WebRTCConnData } from '@/types/webRTCConnData'
import { usePainterThemeSelection } from '@/zustand/store/usePainterThemeSelection'

export const getPainterSelectionCanceled = (rtcData: WebRTCConnData) => {
  const { event, from } = rtcData
  if (event !== 'painterSelectionCanceled' && from !== 'client') return null

  usePainterThemeSelection.getState().set({
    status: null,
  })
}
