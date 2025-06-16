import { storePaintersAccess } from '@/store/storePaintersAccess'
import type { PlayerLeft } from '@/types'
import { postMsgToCanvasWorker, postMsgToPlayerTimerWorker } from '@/workers'
import { useCoins } from '@/zustand/store/useCoins'
import { useGuessedPlayers } from '@/zustand/store/useGuessedPlayers'
import { useIsGameStopped } from '@/zustand/store/useIsGameStopped'
import { useMatchStatusClient } from '@/zustand/store/useMatchStatusClient'
import { useMyCoin } from '@/zustand/store/useMyCoin'
import { useNewPainterPanel } from '@/zustand/store/useNewPainterPanel'
import { usePlayers } from '@/zustand/store/usePlayers'
import { usePowerups } from '@/zustand/store/usePowerups'
import { useRoomGuessChatMsgsStore } from '@/zustand/store/useRoomGuessChatMsgs'
import { useRoomGeneralChatMsgsStore } from '@/zustand/store/useRoomGeneralChatMsgs'
import { useSelectThemePanel } from '@/zustand/store/useSelectThemePanel'
import { useTotalMatchCount } from '@/zustand/store/useTotalMatchCount'
import { useWhoIsPainterClient } from '@/zustand/store/useWhoIsPainterClient'
import { useXY } from '@/zustand/store/useXY'
import { usePlayersWhoGaveUp } from '@/zustand/store/usePlayersWhoGaveUp'
import { useLetterHint } from '@/zustand/store/useLetterHint'

export const getLeftPlayers = (data: PlayerLeft['data']) => {
  const isPainter = useWhoIsPainterClient.getState().isPainter(data.ID)

  usePlayers.getState().removePlayer(data.ID)
  useXY.getState().reset()

  usePlayersWhoGaveUp.getState().remove(data.ID)
  const userReamainPainterAccessCount = storePaintersAccess.removePlayerFromPaintersToBeSelected(data.ID, useTotalMatchCount.getState().value.userPainterAccesCount!)
  useTotalMatchCount.getState().decreaseTotalMatchCount(userReamainPainterAccessCount)

  if (usePlayers.getState().value.count === 0) {
    postMsgToCanvasWorker({
      e: 'reset',
    })

    postMsgToPlayerTimerWorker({
      event: 'stop',
      ID: 'MATCH_REMAIN_TIME'
    })

    useMatchStatusClient.getState().reset()
    useWhoIsPainterClient.getState().reset()
    useXY.getState().reset()
    useMatchStatusClient.getState().clearMatch()
    useIsGameStopped.getState().addCode('waitingForHost')
    useIsGameStopped.getState().addCode('waitingForPlayers')
    usePowerups.getState().reset()
    useGuessedPlayers.getState().reset()
    useMyCoin.getState().reset()
    useCoins.getState().reset()
    useSelectThemePanel.getState().reset()
  }
  else if (isPainter) {
    const painterStatus = useWhoIsPainterClient.getState().value.status

    useLetterHint.getState().reset()
    useRoomGeneralChatMsgsStore.getState().reset()
    useRoomGuessChatMsgsStore.getState().reset()
    useGuessedPlayers.getState().reset()
    useNewPainterPanel.getState().reset()

    if (painterStatus === 'selectedTheme') {
      postMsgToCanvasWorker({
        e: 'reset',
      })
      postMsgToPlayerTimerWorker({
        event: 'stop',
        ID: 'MATCH_REMAIN_TIME'
      })

      useMatchStatusClient.getState().clearMatch()
      useMyCoin.getState().returnPrev()
      useCoins.getState().returnPrev()
      usePowerups.getState().reset()
    }
    else if (painterStatus === 'selectingTheme') {
      postMsgToPlayerTimerWorker({
        event: 'stop',
        ID: 'PAINTER_SELECTING_REMAIN_TIME'
      })
    }
  }
}
