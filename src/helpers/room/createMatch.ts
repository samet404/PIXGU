import { updatePainterToPlayers } from './updatePainterToPlayers'
import { grayLog, getNextArrElmI, mToMs, sToMs } from '@/utils'
import { useMatchStatus } from '@/zustand/store/useMatchStatus'
import {
  useCoins,
  useGuessedPlayers,
  useHostingHealth,
  useHostPainterData,
  usePlayers,
  useSpectators,
  useWhoIsPainter,
} from '@/zustand/store'
import { getCanvasWorker, type CanvasWorkerOnMsgData } from '@/workers'

export const createMatch = async (roomID: string) => {
  const canvasWorker = getCanvasWorker()
  const isSpectator = useSpectators.getState().isSpectator
  const playersIDs = usePlayers
    .getState()
    .getPlayersIDs()
    .filter((ID) => !isSpectator(ID))
  const players = usePlayers.getState().get
  const setCurrentPainter = useWhoIsPainter.getState().setCurrentPainter
  const isFirstMatch = useMatchStatus.getState().value.isFirstMatch
  const isGameEnded = useMatchStatus.getState().value.matchCount === 10

  console.log({
    isGameEnded,
    isFirstMatch,
    matchCount: useMatchStatus.getState().value.matchCount,
    playersIDs,
    players,
  })
  if (isGameEnded) {

    const { sendToAllPeers } = await import('@/utils')

    sendToAllPeers({

      event: 'gameEnded',
      data: {
        coins: useCoins.getState().getSortedByAmount(),
      },
    })

    useHostingHealth.getState().set('gameEnded')
    useMatchStatus.getState().reset()
    useHostPainterData.getState().reset()
    useWhoIsPainter.getState().reset()
    useMatchStatus.getState().reset()
    useSpectators.getState().reset()
    useCoins.getState().reset()
    canvasWorker.current.postMessage({ e: 3 } as CanvasWorkerOnMsgData)
    useGuessedPlayers.getState().reset()

    const intervalStartedAt = Date.now()
    const interval = setInterval(() => {
      const passedMs = Date.now() - intervalStartedAt

      if (passedMs >= sToMs(20)) {
        clearInterval(interval)
        if (usePlayers.getState().value.count > 1)
          useHostingHealth.getState().set('readyToStart')
        else useHostingHealth.getState().set('waitingForPlayers')
      }
    }, 1000)

    return
  }

  // if (isFirstMatch && players().count >= 2) {
  //   useGuessedPlayers.getState().reset()
  //   const painterID = playersIDs[0]!
  //   setCurrentPainter({
  //     nextPainterI: 1,
  //     painterID,
  //     amIPainter: false,
  //   })

  //   useHostPainterData.getState().reset()
  //   usePixelHistory.getState().reset()
  //   updatePainterToPlayers(roomID)
  // } else
  if (players().count >= 2) {
    useGuessedPlayers.getState().reset()
    const whoIsPainter = useWhoIsPainter.getState().value

    if (whoIsPainter.status === 'thereIsNoPainter') {
      const nextPainterI = 0
      const { index: newNextPainterI } = getNextArrElmI(
        playersIDs,
        nextPainterI,
      )

      setCurrentPainter({
        amIPainter: false,
        nextPainterI: newNextPainterI,
        painterID: playersIDs[nextPainterI]!,
      })

      useHostPainterData.getState().reset()
      updatePainterToPlayers(roomID)

      return
    }

    const { nextPainterI, painterID } = whoIsPainter

    const { index: newNextPainterI } = getNextArrElmI(playersIDs, nextPainterI)

    setCurrentPainter({
      amIPainter: false,
      nextPainterI: newNextPainterI,
      painterID: playersIDs[nextPainterI]!,
    })

    useHostPainterData.getState().reset()
    updatePainterToPlayers(roomID)
  }
}
