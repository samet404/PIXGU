import { useWhoIsPainter } from '@/zustand/store/useWhoIsPainter'
import { useCoins } from '@/zustand/store/useCoins'
import { useGuessedPlayers } from '@/zustand/store/useGuessedPlayers'
import { useHostingHealth } from '@/zustand/store/useHostingHealth'
import { useMatchStatus } from '@/zustand/store/useMatchStatus'
import { usePeers } from '@/zustand/store/usePeers'
import { usePlayers } from '@/zustand/store/usePlayers'
import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'
import { useSocketIO } from '@/zustand/store/useSocketIO'
import { useTotalMatchCount } from '@/zustand/store/useTotalMatchCount'
import type { Locale } from '@/types/locale'
import { createMatch } from '@/helpers/room'
import { storePaintersAccess } from '@/store/storePaintersAccess'
import { negativeLog } from '@/utils/negativeLog'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { postMsgToCanvasWorker, postMsgToHostTimerWorker } from '@/workers'

export const playerLeft = (userID: string, roomID: string, locale: Locale) => {
  negativeLog(`PLAYER ${userID} LEFT THE GAME`)

  sendToAllPeers({
    event: 'gameLog',
    data: {
      color: 'red',
      data: `${userID} left the game`,
      time: Date.now(),
    },
  })

  sendToAllPeers({
    event: 'playerLeft',
    data: {
      ID: userID,
    },
  })


  const remainPainterAccessCount = storePaintersAccess.removePlayerFromPaintersToBeSelected(userID, useTotalMatchCount.getState().value.userPainterAccesCount!)
  useTotalMatchCount.getState().decreaseTotalMatchCount(remainPainterAccessCount)
  usePeers.getState().removePeer(userID)
  usePlayers.getState().removePlayer(userID)
  useGuessedPlayers.getState().reset()
  usePlayersPowerups.getState().removeUser(userID)

  if (usePlayers.getState().value.count <= 1) {
    postMsgToHostTimerWorker({
      ID: 'MATCH_REMAIN_TIME',
      event: 'stop',
    })
    postMsgToHostTimerWorker({
      ID: 'PAINTER_TIME_IS_UP',
      event: 'stop',
    })
    postMsgToHostTimerWorker({
      ID: 'MATCH_ENDED',
      event: 'stop',
    })
    postMsgToCanvasWorker({
      e: 'reset',
    })
    useHostingHealth.getState().set('waitingForPlayers')
    useMatchStatus.getState().reset()
    useCoins.getState().reset()
    useSocketIO.getState().io!.emit('game-started', false)
  }
  else if (useWhoIsPainter.getState().isPainter(userID)) {
    const painterStatus = useWhoIsPainter.getState().value.status

    postMsgToHostTimerWorker({
      ID: 'PAINTER_TIME_IS_UP',
      event: 'stop',
    })
    postMsgToHostTimerWorker({
      ID: 'MATCH_REMAIN_TIME',
      event: 'stop',
    })
    postMsgToCanvasWorker({
      e: 'reset',
    })

    if (painterStatus === 'selectingTheme') {
      sendToAllPeers({
        event: 'painterSelectedThemeTimeIsUp',
      })
    }
    else if (painterStatus === 'selectedTheme') {
      if (useCoins.getState().prevCoins) useCoins.getState().returnPrev()
    }

    useWhoIsPainter.getState().reset()
    useMatchStatus.getState().cancelMatch()
    createMatch(locale)
  }

  useSocketIO.getState().io!.emit('current-players', {
    count: usePlayers.getState().value.count,
    IDs: Object.keys(usePlayers.getState().value.obj),
  })
}
