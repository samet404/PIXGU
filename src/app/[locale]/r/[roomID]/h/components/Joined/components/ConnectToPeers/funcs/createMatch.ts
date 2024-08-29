import { updatePaintersToPlayers } from './updatePaintersToPlayers'
import { grayLog, getNextArrElmI, mToMs } from '@/utils'
import { useOtherHostRoomStatus } from '@/zustand/store/useOtherHostRoomStatus'
import { usePlayers, useWhoIsPainter } from '@/zustand/store'
import { sendToPeerWithID } from '@/utils/sendToPeerWithID'

export const createMatch = (roomID: string) => {
  const otherRoomStatues = useOtherHostRoomStatus.getState().get()
  const changePlayer = usePlayers.getState().changePlayer
  const playersIDs = usePlayers.getState().getPlayersIDs()
  const players = usePlayers.getState().get
  const setCurrentPainter = useWhoIsPainter.getState().setCurrentPainter

  if (otherRoomStatues.isFirstMatch && players().count >= 2) {
    sendToPeerWithID(playersIDs[0]!, {
      from: 'host',
      event: 'resumeMatch',
      data: 'waitingForPlayersToJoin',
    })
    const painterID = playersIDs[0]!
    setCurrentPainter({
      nextPainterI: 1,
      painterID,
      amIPainter: false,
    })

    changePlayer(painterID, {
      isPainter: true,
    })

    useOtherHostRoomStatus.getState().add({
      isFirstMatch: false,
    })

    useOtherHostRoomStatus.getState().add({
      matchInterval: setInterval(() => createMatch(roomID), mToMs(2)),
    })
    updatePaintersToPlayers(roomID)
  } else if (players().count >= 2) {
    const whoIsPainter = useWhoIsPainter.getState().value

    if (whoIsPainter.status === 'thereIsNoPainter') {
      console.error('-_-')
      return
    }

    const { nextPainterI, painterID } = whoIsPainter

    changePlayer(painterID, {
      isPainter: true,
    })

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
