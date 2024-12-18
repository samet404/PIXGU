import { resetMatchStates } from '@/helpers/room'
import type { CurrentPainter } from '@/types'
import { postMsgToCanvasWorker, postMsgToPlayerTimerWorker } from '@/workers'
import {
  useAmIGuessed,
  useGuessChatLayout,
  useGuessedPlayers,
  useIsGameStopped,
  useLetterHint,
  useNewPainterPanel,
  useOwnedPowerups,
  usePainterSelectingRemainTime,
  usePlayers,
  useRoomGuessChatMsgsStore,
  useRoomWinnersChatMsgsStore,
  useSelectThemePanel,
  useTotalMatchCount,
  useWhoIsPainterClient,
  useWinnersChatLayout,
} from '@/zustand/store'

export const getPainter = (
  data: CurrentPainter['data'],
  myUserID: string,
) => {
  const amIPainter = myUserID === data
  console.log('amIPainter', amIPainter)

  if (useIsGameStopped.getState().value.code?.includes('waitingForHost'))
    useIsGameStopped.getState().removeCode('waitingForHost')

  useOwnedPowerups.getState().reset()
  useWhoIsPainterClient.getState().setPainterSelected({
    painterID: data,
    amIPainter,
  })
  postMsgToPlayerTimerWorker({
    ID: 'PAINTER_SELECTING_REMAIN_TIME',
    event: 'stop',
  })

  postMsgToCanvasWorker({
    e: 'reset',
  })

  resetMatchStates()


  usePainterSelectingRemainTime.getState().reset()
  useLetterHint.getState().reset()
  useGuessedPlayers.getState().reset()
  useAmIGuessed.getState().noIMNotGuessed()
  useTotalMatchCount.getState().set(usePlayers.getState().value.count + 1)

  if (amIPainter) {
    console.log('amIPainter true')
    useSelectThemePanel.getState().open()
    useNewPainterPanel.getState().close()

    useRoomWinnersChatMsgsStore.getState().reset()
    useWinnersChatLayout.getState().setPainterLayout()
    useGuessChatLayout.getState().setPainterLayout()
    useRoomGuessChatMsgsStore.getState().reset()
  } else {
    console.log('amIPainter false')
    useNewPainterPanel.getState().open({ painterID: data })
    useSelectThemePanel.getState().close()

    useWinnersChatLayout.getState().setImNotGuessed()
    useRoomWinnersChatMsgsStore.getState().reset()
    useGuessChatLayout.getState().setImNotGuessed()
    useRoomGuessChatMsgsStore.getState().reset()
  }
}
