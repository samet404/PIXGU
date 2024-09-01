import { updatePaintersToPlayers } from './updatePaintersToPlayers'
import { grayLog, getNextArrElmI, mToMs } from '@/utils'
import { useOtherHostRoomStatus } from '@/zustand/store/useOtherHostRoomStatus'
import { usePlayers, useWhoIsPainter } from '@/zustand/store'

export const createMatch = (roomID: string) => {
  const otherRoomStatues = useOtherHostRoomStatus.getState().get()
  const playersIDs = usePlayers.getState().getPlayersIDs()
  const players = usePlayers.getState().get
  const setCurrentPainter = useWhoIsPainter.getState().setCurrentPainter

  if (otherRoomStatues.isFirstMatch && players().count >= 2) {
    const painterID = playersIDs[0]!
    setCurrentPainter({
      nextPainterI: 1,
      painterID,
      amIPainter: false,
    })

    useOtherHostRoomStatus.getState().add({
      isFirstMatch: false,
    })

    useOtherHostRoomStatus.getState().add({
      matchInterval: setInterval(() => createMatch(roomID), mToMs(22)),
    })
    updatePaintersToPlayers(roomID)
  } else if (players().count >= 2) {
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

    updatePaintersToPlayers(roomID)
    grayLog('MATCH CREATED')
  }
}
