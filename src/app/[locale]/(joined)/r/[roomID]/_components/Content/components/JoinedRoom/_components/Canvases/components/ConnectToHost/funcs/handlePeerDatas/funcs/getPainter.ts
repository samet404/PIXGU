import type { CurrentPainter } from '@/types'
import {
  useAmIGuessed,
  useCanvasesMainData,
  useGuessChatLayout,
  useGuessedPlayers,
  useIsGameStopped,
  useMatchStatusClient,
  useNewPainterPanel,
  useSelectThemePanel,
  useWhoIsPainterClient,
  useWinnersChatLayout,
} from '@/zustand/store'

export const getPainter = async (
  data: CurrentPainter['data'],
  myUserID: string,
) => {
  const amIPainter = myUserID === data

  if (useIsGameStopped.getState().value.code?.includes('waitingForHost'))
    useIsGameStopped.getState().removeCode('waitingForHost')
  useMatchStatusClient.getState().waitingForThemes()
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

  useGuessedPlayers.getState().reset()
  useAmIGuessed.getState().noIMNotGuessed()

  console.log('AM I PAINTER: ', amIPainter)
  if (amIPainter) {
    useSelectThemePanel.getState().open()
    useNewPainterPanel.getState().close()

    useWinnersChatLayout.getState().setPainterLayout()
    useGuessChatLayout.getState().setPainterLayout()
  } else {
    useNewPainterPanel.getState().open({ painterID: data })
    useSelectThemePanel.getState().close()

    useWinnersChatLayout.getState().setImNotGuessed()
    useGuessChatLayout.getState().setImNotGuessed()
  }
}
