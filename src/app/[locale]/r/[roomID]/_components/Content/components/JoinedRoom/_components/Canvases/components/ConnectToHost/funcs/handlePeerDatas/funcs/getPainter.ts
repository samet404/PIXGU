import type { WebRTCConnData } from '@/types'

export const getPainter = async (rtcData: WebRTCConnData, myUserID: string) => {
  const { event, from } = rtcData

  if (event === 'currentPainter' && from === 'host') {
    const { goldLog } = await import('@/utils/goldLog')
    const {
      useWhoIsPainterClient,
      useGuessChatLayout,
      useWinnersChatLayout,
      useCanvasesMainData,
    } = await import('@/zustand/store')

    const { data } = rtcData
    goldLog('currentPainter', data)
    const amIPainter = myUserID === data
    useWhoIsPainterClient.getState().setCurrentPainter({
      painterID: data,
      amIPainter,
    })

    const { main, draft } = useCanvasesMainData.getState()

    const mctx = main!.getContext('2d')!
    mctx.beginPath()
    mctx.fillStyle = '#ffffff'
    mctx.fillRect(0, 0, main!.width, main!.height)
    mctx.beginPath()

    const dctx = draft!.getContext('2d')!
    dctx.beginPath()
    dctx.clearRect(0, 0, main!.width, main!.height)
    dctx.beginPath()

    if (amIPainter) {
      const { useSelectThemePanel } = await import('@/zustand/store')

      useSelectThemePanel.getState().open()
      useWinnersChatLayout.getState().setPainterLayout()
      useGuessChatLayout.getState().setPainterLayout()
    } else {
      const { useNewPainterPanel } = await import('@/zustand/store')

      useNewPainterPanel.getState().open({ painterID: data })
      useWinnersChatLayout.getState().setImNotGuessed()
      useGuessChatLayout.getState().setImNotGuessed()
    }
  }
}
