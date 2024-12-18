import { getNextArrElmI } from '@/utils'
import { updatePainterToPlayers } from './updatePainterToPlayers'
import { useMatchStatus } from '@/zustand/store/useMatchStatus'
import { storePaintersAccess } from '@/store'
import { gameEnded } from './_index'
import {
  useGuessedPlayers,
  useHostCanvasesData,
  useHostPainterData,
  usePlayers,
  useTotalMatchCount,
  useWhoIsPainter,
} from '@/zustand/store'
import { postMsgToCanvasWorker } from '@/workers'


export const createMatch = (roomID: string) => {
  const players = usePlayers.getState().get
  const isGameEnded = (useMatchStatus.getState().value.matchCount === useTotalMatchCount.getState().value.totalMatchCount) || storePaintersAccess.value.paintersToBeSelected.length === 0
  const { mctx } = useHostCanvasesData.getState()

  mctx?.beginPath()
  mctx!.fillStyle = '#ffffff'
  mctx!.fillRect(0, 0, mctx!.canvas.width, mctx!.canvas.height)
  mctx?.closePath()
  postMsgToCanvasWorker({ e: 'reset' })


  if (isGameEnded && players().count > 1) gameEnded()
  else if (players().count >= 2) {
    useGuessedPlayers.getState().reset()
    const whoIsPainter = useWhoIsPainter.getState().value
    const playersIDs = storePaintersAccess.value.paintersToBeSelected

    if (whoIsPainter.status === 'thereIsNoPainter') {
      const nextPainterI = 0
      const { index: newNextPainterI } = getNextArrElmI(
        playersIDs,
        nextPainterI,
      )

      useWhoIsPainter.getState().painterSelected({
        nextPainterI: newNextPainterI,
        painterID: playersIDs[nextPainterI]!,
      })

      useHostPainterData.getState().reset()
      updatePainterToPlayers(roomID)

      return
    }


    if (playersIDs.length === 1) {
      useWhoIsPainter.getState().painterSelected({
        nextPainterI: null,
        painterID: playersIDs[0]!,
      })
    } else {
      const { nextPainterI } = whoIsPainter
      const { index: newNextPainterI } = getNextArrElmI(playersIDs, nextPainterI!)

      useWhoIsPainter.getState().painterSelected({
        nextPainterI: newNextPainterI,
        painterID: playersIDs[nextPainterI!]!,
      })
    }

    useHostPainterData.getState().reset()
    updatePainterToPlayers(roomID)
  }
}
