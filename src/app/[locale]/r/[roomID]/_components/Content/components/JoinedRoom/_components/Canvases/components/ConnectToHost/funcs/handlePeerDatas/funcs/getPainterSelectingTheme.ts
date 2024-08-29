import type { WebRTCConnData } from '@/types/webRTCConnData'

export const getPainterSelectingTheme = async (rtcData: WebRTCConnData) => {
  const { from, event } = rtcData
  if (event === 'painterSelectingTheme' && from === 'host')
    (await import('@/zustand/store')).useNewPainterPanel
      .getState()
      .setSelectingTheme()
}
