import { getNext2ArrElmI } from '@/utils/getNext2ArrElmI'
import { updatePaintersToPlayers } from './updatePaintersToPlayers'
import { grayLog } from '@/utils/grayLog'
import { useOtherHostRoomStatus } from '@/zustand/store/useOtherHostRoomStatus'
import { usePainterData, usePlayers } from '@/zustand/store'

export const createMatch = () => {
  const otherRoomStatues = useOtherHostRoomStatus.getState().get()
  const changePlayer = usePlayers.getState().changePlayer
  const playersIDs = usePlayers.getState().getPlayersIDs()
  const getPainterData = usePainterData.getState().get
  const setPainterData = usePainterData.getState().add

  if (otherRoomStatues.isFirstMatch || otherRoomStatues.isMatchPaused) {
    const firstPainterID = playersIDs[0]!
    const secondPainterID = playersIDs[1]!

    setPainterData({
      secondPainterI: 1,
    })

    changePlayer(firstPainterID, {
      isPainter: true,
    })

    changePlayer(secondPainterID, {
      isPainter: true,
    })

    setPainterData({
      ...getPainterData(),
      painters: {
        [firstPainterID]: {
          pixelHistory: {},
          lastDrawedPixel: null,
        },
        [secondPainterID]: {
          pixelHistory: {},
          lastDrawedPixel: null,
        },
      },
    })

    updatePaintersToPlayers()
  } else {
    const { firstI, secondI } = getNext2ArrElmI(
      playersIDs,
      getPainterData().secondPainterI,
    )

    const firstPainterID = playersIDs[firstI!]
    const secondPainterID = playersIDs[secondI!]

    if (!firstPainterID || !secondPainterID) {
      grayLog('NO PAINTERS FOUND')
      return
    }

    changePlayer(firstPainterID, {
      isPainter: true,
    })

    changePlayer(secondPainterID, {
      isPainter: true,
    })

    setPainterData({
      ...getPainterData(),
      secondPainterI: secondI!,
      painters: {
        [firstI!]: {
          pixelHistory: {},
          lastDrawedPixel: null,
        },
        [secondI!]: {
          pixelHistory: {},
          lastDrawedPixel: null,
        },
      },
    })
    updatePaintersToPlayers()
    grayLog('MATCH CREATED')
  }
}
