import type { CurrentPainter } from '@/types'
import {
  useAmIGuessed,
  useCanvasesMainData,
  useGuessChatLayout,
  useIsGameStopped,
  useWhoIsPainterClient,
  useWinnersChatLayout,
} from '@/zustand/store'

export const getPainter = async (
  data: CurrentPainter['data'],
  myUserID: string,
) => {
  const amIPainter = myUserID === data

  useIsGameStopped.getState().open()

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

  useAmIGuessed.getState().noIMNotGuessed()

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
