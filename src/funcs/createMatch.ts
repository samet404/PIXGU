import { updatePainterToPlayers } from './updatePainterToPlayers'
import { grayLog, getNextArrElmI, mToMs, sToMs } from '@/utils'
import { useMatchStatus } from '@/zustand/store/useMatchStatus'
import {
  useGuessedPlayers,
  useHostingHealth,
  useHostPainterData,
  usePixelHistory,
  usePlayers,
  useSpectators,
  useWhoIsPainter,
} from '@/zustand/store'

export const createMatch = async (roomID: string) => {
  const isSpectator = useSpectators.getState().isSpectator
  const playersIDs = usePlayers
    .getState()
    .getPlayersIDs()
    .filter((ID) => !isSpectator(ID))
  const players = usePlayers.getState().get
  const setCurrentPainter = useWhoIsPainter.getState().setCurrentPainter
  const isFirstMatch = useMatchStatus.getState().value.isFirstMatch
  const isGameEnded = useMatchStatus.getState().value.matchCount === 10

  console.log('matchCount: ', useMatchStatus.getState().value.matchCount)
  if (isGameEnded) {
    const {
      useCoins,
      useSpectators,
      useLastPixel,
      usePixelHistory,
      useGuessedPlayers,
      useHostPainterData,
      useMatchStatus,
    } = await import('@/zustand/store')
    const { sendToAllPeers } = await import('@/utils')

    sendToAllPeers({
      from: 'host',
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
    useLastPixel.getState().reset()
    usePixelHistory.getState().reset()
    useGuessedPlayers.getState().reset()

    const intervalStartedAt = Date.now()
    const interval = setInterval(() => {
      const passedMs = Date.now() - intervalStartedAt

      if (passedMs >= mToMs(0.25)) {
        clearInterval(interval)
        if (usePlayers.getState().value.count > 1)
          useHostingHealth.getState().set('readyToStart')
        else useHostingHealth.getState().set('waitingForPlayers')
      }
    }, 1000)

    return
  }

  if (isFirstMatch && players().count >= 2) {
    useGuessedPlayers.getState().reset()
    const painterID = playersIDs[0]!
    setCurrentPainter({
      nextPainterI: 1,
      painterID,
      amIPainter: false,
    })

    useHostPainterData.getState().reset()
    usePixelHistory.getState().reset()
    updatePainterToPlayers(roomID)
  } else if (players().count >= 2) {
    useGuessedPlayers.getState().reset()
    const whoIsPainter = useWhoIsPainter.getState().value

    if (whoIsPainter.status === 'thereIsNoPainter') {
      console.error('-_-')
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
    usePixelHistory.getState().reset()
    updatePainterToPlayers(roomID)
  }
}
