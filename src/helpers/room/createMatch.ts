import { updatePainterToPlayers } from './updatePainterToPlayers'
import { useHostPlayersMsgs, useLoserPlayers, useMatchStatus, usePlayersWhoGaveUp } from '@/zustand/store'
import { postMsgToCanvasWorker } from '@/workers'
import { storePaintersAccess } from '@/store'
import { getNextArrElmI } from '@/utils'
import type { Locale } from '@/types'
import { gameEnded } from './_index'
import {
  useGuessedPlayers,
  useHostCanvasesData,
  useHostPainterData,
  usePlayers,
  useTotalMatchCount,
  useWhoIsPainter,
} from '@/zustand/store'


export const createMatch = (locale: Locale) => {
  const players = usePlayers.getState().get
  const isGameEnded = (useMatchStatus.getState().value.matchCount === useTotalMatchCount.getState().value.totalMatchCount) || storePaintersAccess.value.paintersToBeSelected.length === 0
  const { mctx } = useHostCanvasesData.getState()

  mctx?.beginPath()
  mctx!.fillStyle = '#ffffff'
  mctx!.fillRect(0, 0, mctx!.canvas.width, mctx!.canvas.height)
  mctx?.closePath()
  postMsgToCanvasWorker({ e: 'reset' })

  useHostPlayersMsgs.getState().resetGuessChatMsgCounts()
  usePlayersWhoGaveUp.getState().everyoneNotGaveUp()
  useLoserPlayers.getState().everyoneIsNotLoser()

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
      updatePainterToPlayers({ locale })

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
    updatePainterToPlayers({ locale })
  }
}
