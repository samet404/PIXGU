import type { OtherRoomStatues } from '@/types/otherRoomStatues'
import { getNext2ArrElmI } from '@/utils/getNext2ArrElmI'
import { updatePaintersToPlayers } from './updatePaintersToPlayers'
import type { Peers } from '@/types/webRTCPeers'
import type { PainterData } from '@/types/canvasData'

export const createMatch = (
  otherRoomStatues: OtherRoomStatues,
  playersIDsOrderedByTimestamp: {
    value: string[]
  },
  painterData: PainterData,
  peers: Peers,
) => {
  if (
    (otherRoomStatues.players.count === 1 && otherRoomStatues.isFirstMatch) ||
    otherRoomStatues.isMatchPaused
  ) {
    const firstPainterID = playersIDsOrderedByTimestamp.value[0]!
    const secondPainterID = playersIDsOrderedByTimestamp.value[1]!

    otherRoomStatues.players.secondPainterIndex = 1

    otherRoomStatues.players.info[firstPainterID]!.isPainter = true
    otherRoomStatues.players.info[secondPainterID]!.isPainter = true

    updatePaintersToPlayers(firstPainterID, secondPainterID, peers)

    painterData.value!.painters[firstPainterID] = {
      pixelHistory: {},
      lastDrawedPixel: null,
    }

    painterData.value!.painters[secondPainterID] = {
      pixelHistory: {},
      lastDrawedPixel: null,
    }
  } else {
    const paintersIs = getNext2ArrElmI(
      playersIDsOrderedByTimestamp.value,
      otherRoomStatues.players.secondPainterIndex!,
    )

    const firstPainterID =
      playersIDsOrderedByTimestamp.value[paintersIs.firstI!]!
    const secondPainterID =
      playersIDsOrderedByTimestamp.value[paintersIs.secondI!]!

    otherRoomStatues.players.secondPainterIndex = paintersIs.secondI
    otherRoomStatues.players.info[firstPainterID]!.isPainter = true
    otherRoomStatues.players.info[secondPainterID]!.isPainter = true

    painterData.value!.painters[firstPainterID] = {
      pixelHistory: {},
      lastDrawedPixel: null,
    }

    painterData.value!.painters[secondPainterID] = {
      pixelHistory: {},
      lastDrawedPixel: null,
    }

    updatePaintersToPlayers(firstPainterID, secondPainterID, peers)
  }
}
