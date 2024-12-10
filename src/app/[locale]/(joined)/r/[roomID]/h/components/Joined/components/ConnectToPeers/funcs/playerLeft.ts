import {
  useCoins,
  useGuessedPlayers,
  useHostingHealth,
  useMatchStatus,
  usePeers,
  usePlayers,
  usePlayersOwnedPowerups,
  useSocketIO,
  useTotalMatchCount,
  useWhoIsPainter,
} from '@/zustand/store'
import { negativeLog } from '@/utils/negativeLog'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { createMatch } from '@/helpers/room'
import { postMsgToCanvasWorker, postMsgToHostTimerWorker } from '@/workers'
import { storePaintersAccess } from '@/store'

export const playerLeft = (userID: string, roomID: string) => {
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

  if (usePlayers.getState().value.count <= 1) {
    useHostingHealth.getState().set('waitingForPlayers')
    useMatchStatus.getState().reset()
    useCoins.getState().reset()
    usePlayersOwnedPowerups.getState().reset()
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
      if (usePlayersOwnedPowerups.getState().prevValue) usePlayersOwnedPowerups.getState().returnPrev()
    }



    useWhoIsPainter.getState().reset()
    useMatchStatus.getState().cancelMatch()
    createMatch(roomID)
  }
}
