import { updatePainterToPlayers } from './updatePainterToPlayers'
import { grayLog, getNextArrElmI, mToMs, sToMs } from '@/utils'
import { useMatchStatus } from '@/zustand/store/useMatchStatus'
import {
  useGuessedPlayers,
  useHostingHealth,
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
    useMatchStatus.getState().reset()

    sendToAllPeers({
      from: 'host',
      event: 'gameEnded',
      data: {
        coins: useCoins.getState().getSortedByAmount(),
      },
    })

    useHostingHealth.getState().set('gameEnded')

    useMatchStatus.getState().reset()
    useSpectators.getState().reset()
    useLastPixel.getState().reset()
    usePixelHistory.getState().reset()
    useGuessedPlayers.getState().reset()
    useHostPainterData.getState().reset()

    setTimeout(() => {
      if (usePlayers.getState().value.count > 1)
        useHostingHealth.getState().set('readyToStart')
      else useHostingHealth.getState().set('waitingForPlayers')
    }, sToMs(20))

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

    usePixelHistory.getState().reset()
    updatePainterToPlayers(roomID)
  }
}
