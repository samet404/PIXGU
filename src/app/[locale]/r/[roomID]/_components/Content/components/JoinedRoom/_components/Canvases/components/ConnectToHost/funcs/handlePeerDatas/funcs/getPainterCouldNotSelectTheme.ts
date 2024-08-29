import type { WebRTCConnData } from '@/types/webRTCConnData'

export const getPainterCouldNotSelectTheme = async (
  rtcData: WebRTCConnData,
  myUserID: string,
) => {
  const { event, from } = rtcData

  if (event === 'painterCouldNotSelectTheme' && from === 'host') {
    const { useNewPainterPanel } = await import('@/zustand/store')
    const { useSelectThemePanel } = await import('@/zustand/store')
    const { useGuessChatLayout } = await import('@/zustand/store')
    const { useWinnersChatLayout } = await import('@/zustand/store')

    const { data } = rtcData

    useNewPainterPanel.getState().close()
    useSelectThemePanel.getState().close()
    useGuessChatLayout.getState().setImNotGuessed()
    useWinnersChatLayout.getState().setImNotGuessed()
  }
}
