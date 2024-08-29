import type { WebRTCConnData } from '@/types/webRTCConnData'

export const getThemes = async (rtcData: WebRTCConnData, userID: string) => {
  const { from, event } = rtcData
  if (event === 'selectTheme' && from === 'host') {
    const { data } = rtcData

    const { useSelectThemePanel } = await import('@/zustand/store')

    useSelectThemePanel.getState().setSelectingTheme({ themes: data })
  }
}
