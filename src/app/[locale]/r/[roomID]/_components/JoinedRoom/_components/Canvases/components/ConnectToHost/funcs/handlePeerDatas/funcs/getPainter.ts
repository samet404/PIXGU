import { resetMatchStates } from '@/helpers/room'
import { storePaintersAccess } from '@/store/storePaintersAccess'
import type { CurrentPainter } from '@/types'
import { postMsgToCanvasWorker, postMsgToPlayerTimerWorker } from '@/workers'
import { useAmIGuessed } from '@/zustand/store/useAmIGuessed'
import { useGuessChatLayout } from '@/zustand/store/useGuessChatLayout'
import { useGuessedPlayers } from '@/zustand/store/useGuessedPlayers'
import { useIsGameStopped } from '@/zustand/store/useIsGameStopped'
import { useMatchStatusClient } from '@/zustand/store/useMatchStatusClient'
import { useNewPainterPanel } from '@/zustand/store/useNewPainterPanel'
import { usePowerups } from '@/zustand/store/usePowerups'
import { usePainterSelectingRemainTime } from '@/zustand/store/usePainterSelectingRemainTime'
import { usePlayers } from '@/zustand/store/usePlayers'
import { useRoomGuessChatMsgsStore } from '@/zustand/store/useRoomGuessChatMsgs'
import { useRoomGeneralChatMsgsStore } from '@/zustand/store/useRoomGeneralChatMsgs'
import { useSelectThemePanel } from '@/zustand/store/useSelectThemePanel'
import { useTotalMatchCount } from '@/zustand/store/useTotalMatchCount'
import { useWhoIsPainterClient } from '@/zustand/store/useWhoIsPainterClient'
import { useGeneralChatLayout } from '@/zustand/store/useGeneralChatLayout'
import { useLetterHint } from '@/zustand/store/useLetterHint'
import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'
import { usePlayersWhoGaveUp } from '@/zustand/store/usePlayersWhoGaveUp'
import { useLoserPlayers } from '@/zustand/store/useLoserPlayers'
import { useAmILoser } from '@/zustand/store/useAmILoser'
import { useAmIGaveUp } from '@/zustand/store/useAmIGaveUp'

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

  usePlayers.getState().getPlayersIDs().forEach(ID => {
    if (ID === data) return
    usePlayersPowerups.getState().setGuessrCardsWhileThemeIsSelecting(ID)
  })

  usePlayersWhoGaveUp.getState().everyoneNotGaveUp()
  usePlayersPowerups.getState().setPainterCardsWhileThemeIsSelecting(data)
  useAmIGaveUp.getState().reset()
  useAmILoser.getState().reset()
  usePainterSelectingRemainTime.getState().reset()
  useLetterHint.getState().reset()
  useLoserPlayers.getState().everyoneIsNotLoser()
  useGuessedPlayers.getState().reset()
  useAmIGuessed.getState().noIMNotGuessed()

  if (amIPainter) {
    usePowerups.getState().setPainterCardsWhileThemeIsSelecting()

    console.log('amIPainter true')
    useSelectThemePanel.getState().open()
    useNewPainterPanel.getState().close()

    useRoomGeneralChatMsgsStore.getState().reset()
    useGeneralChatLayout.getState().setPainterLayout()
    useGuessChatLayout.getState().setPainterLayout()
    useRoomGuessChatMsgsStore.getState().reset()
    return
  }

  usePowerups.getState().setGuessrCardsWhileThemeIsSelecting()

  console.log('amIPainter false')
  useNewPainterPanel.getState().open({ painterID: data })
  useSelectThemePanel.getState().close()

  useGeneralChatLayout.getState().setNotAvailable()
  useRoomGeneralChatMsgsStore.getState().reset()
  useGuessChatLayout.getState().setAvailable()
  useRoomGuessChatMsgsStore.getState().reset()
}
