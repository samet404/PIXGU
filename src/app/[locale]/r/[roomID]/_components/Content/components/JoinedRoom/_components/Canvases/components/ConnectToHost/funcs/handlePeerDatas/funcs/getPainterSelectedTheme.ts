import type { WebRTCConnData } from '@/types/webRTCConnData'

export const getPainterSelectedTheme = async (rtcData: WebRTCConnData) => {
  if (rtcData.event === 'painterSelectedTheme' && rtcData.from === 'host')
    (await import('@/zustand/store')).useNewPainterPanel.getState().close()
}
