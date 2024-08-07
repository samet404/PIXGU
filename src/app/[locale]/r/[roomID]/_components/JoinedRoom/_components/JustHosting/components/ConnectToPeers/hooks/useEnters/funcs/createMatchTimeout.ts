import type { OtherRoomStatues, PainterData, Peers } from '@/types'
import { grayLog, mToMs } from '@/utils'
import { createMatch } from './createMatch'

export const createMatchTimeout = (
  painterData: PainterData,
  otherRoomStatues: OtherRoomStatues,
  playersIDsOrderedByTimestamp: {
    value: string[]
  },
  peers: Peers,
): NodeJS.Timeout => {
  grayLog('CREATED MATCH TIMEOUT')
  return setTimeout(() => {
    createMatch(
      otherRoomStatues,
      playersIDsOrderedByTimestamp,
      painterData,
      peers,
    )

    otherRoomStatues.matchTimeout = createMatchTimeout(
      painterData,
      otherRoomStatues,
      playersIDsOrderedByTimestamp,
      peers,
    )
  }, mToMs(10))
}
