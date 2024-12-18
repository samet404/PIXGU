import { storePaintersAccess } from '@/store'
import type { PlayerLeft } from '@/types'
import { postMsgToCanvasWorker, postMsgToPlayerTimerWorker } from '@/workers'
import { useCoins, useGuessedPlayers, useIsGameStopped, useLetterHint, useMatchStatusClient, useMyCoin, useNewPainterPanel, useOwnedPowerups, usePlayers, usePlayersOwnedPowerups, useRoomGuessChatMsgsStore, useRoomWinnersChatMsgsStore, useSelectThemePanel, useTotalMatchCount, useWhoIsPainterClient, useXY } from '@/zustand/store'

export const getLeftPlayers = (data: PlayerLeft['data']) => {
  const isPainter = useWhoIsPainterClient.getState().isPainter(data.ID)

  usePlayers.getState().removePlayer(data.ID)
  useXY.getState().reset()

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
    useOwnedPowerups.getState().reset()
    usePlayersOwnedPowerups.getState().reset()
    useGuessedPlayers.getState().reset()
    useMyCoin.getState().reset()
    useCoins.getState().reset()
    useSelectThemePanel.getState().reset()
  }
  else if (isPainter) {
    const painterStatus = useWhoIsPainterClient.getState().value.status

    useLetterHint.getState().reset()
    useRoomWinnersChatMsgsStore.getState().reset()
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
      usePlayersOwnedPowerups.getState().returnPrev()
      useOwnedPowerups.getState().returnPrev()
    }
    else if (painterStatus === 'selectingTheme') {
      postMsgToPlayerTimerWorker({
        event: 'stop',
        ID: 'PAINTER_SELECTING_REMAIN_TIME'
      })
    }
  }
}
