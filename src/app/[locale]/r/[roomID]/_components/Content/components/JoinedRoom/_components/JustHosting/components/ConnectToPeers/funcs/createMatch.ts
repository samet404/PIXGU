import { updatePaintersToPlayers } from './updatePaintersToPlayers'
import { grayLog, getNextArrElmI } from '@/utils'
import { useOtherHostRoomStatus } from '@/zustand/store/useOtherHostRoomStatus'
import { usePainterData, usePlayers } from '@/zustand/store'

export const createMatch = () => {
  const otherRoomStatues = useOtherHostRoomStatus.getState().get()
  const changePlayer = usePlayers.getState().changePlayer
  const playersIDs = usePlayers.getState().getPlayersIDs()
  const getPainterData = usePainterData.getState().get
  const setPainterData = usePainterData.getState().add
  const players = usePlayers.getState().get

  if (otherRoomStatues.isFirstMatch) {
    const painterID = playersIDs[0]!
    setPainterData({
      nextPainterI: 1,
    })

    changePlayer(painterID, {
      isPainter: true,
    })

    setPainterData({
      ...getPainterData(),
      painter: {
        ID: painterID,
        pixelHistory: {},
        lastDrawedPixel: null,
      },
    })

    updatePaintersToPlayers()
  } else if (players().count >= 2) {
    const currentPainterI = getPainterData().nextPainterI
    const painterID = playersIDs[currentPainterI]!

    changePlayer(painterID, {
      isPainter: true,
    })

    const { index: newNextPainterI } = getNextArrElmI(
      playersIDs,
      getPainterData().nextPainterI,
    )

    setPainterData({
      ...getPainterData(),
      nextPainterI: newNextPainterI,
      painter: {
        ID: painterID,
        pixelHistory: {},
        lastDrawedPixel: null,
      },
    })

    updatePaintersToPlayers()
    grayLog('MATCH CREATED')
  }
}
