import { resetMatchStates } from '@/helpers/room'
import { storePaintersAccess } from '@/store'
import type { CurrentPainter } from '@/types'
import { postMsgToCanvasWorker, postMsgToPlayerTimerWorker } from '@/workers'
import {
  useAmIGuessed,
  useGuessChatLayout,
  useGuessedPlayers,
  useIsGameStopped,
  useLetterHint,
  useMatchStatusClient,
  useNewPainterPanel,
  usePowerups,
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

  if (useMatchStatusClient.getState().isFirstMatch) {
    useTotalMatchCount.getState().set(usePlayers.getState().value.count + 1)
    storePaintersAccess.initUsers([...usePlayers.getState().getPlayersIDs(), myUserID])
  }

  if (useIsGameStopped.getState().value.code?.includes('waitingForHost'))
    useIsGameStopped.getState().removeCode('waitingForHost')

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

  if (amIPainter) {
    usePowerups.getState().setPainterCardsWhileThemeIsSelecting()
    console.log('amIPainter true')
    useSelectThemePanel.getState().open()
    useNewPainterPanel.getState().close()

    useRoomWinnersChatMsgsStore.getState().reset()
    useWinnersChatLayout.getState().setPainterLayout()
    useGuessChatLayout.getState().setPainterLayout()
    useRoomGuessChatMsgsStore.getState().reset()
  } else {
    usePowerups.getState().setGuessrCardsWhileThemeIsSelecting()
    console.log('amIPainter false')
    useNewPainterPanel.getState().open({ painterID: data })
    useSelectThemePanel.getState().close()

    useWinnersChatLayout.getState().setImNotGuessed()
    useRoomWinnersChatMsgsStore.getState().reset()
    useGuessChatLayout.getState().setImNotGuessed()
    useRoomGuessChatMsgsStore.getState().reset()
  }
}
