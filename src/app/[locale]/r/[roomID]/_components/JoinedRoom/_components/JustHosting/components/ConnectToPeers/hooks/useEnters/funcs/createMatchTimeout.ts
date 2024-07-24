import type { OtherRoomStatues, PainterData, Peers } from '@/types'
import { mToMs } from '@/utils'
import { createMatch } from './createMatch'

export const createMatchTimeout = (
  painterData: PainterData,
  otherRoomStatues: OtherRoomStatues,
  playersIDsOrderedByTimestamp: {
    value: string[]
  },
  peers: Peers,
): NodeJS.Timeout =>
  setTimeout(() => {
    createMatch(otherRoomStatues, playersIDsOrderedByTimestamp, peers)

    otherRoomStatues.matchTimeout = createMatchTimeout(
      painterData,
      otherRoomStatues,
      playersIDsOrderedByTimestamp,
      peers,
    )
  }, mToMs(10))
