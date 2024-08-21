import {
  usePeers,
  usePlayers,
  useOtherHostRoomStatus,
  usePainterData,
} from '@/zustand/store'
import type SimplePeer from 'simple-peer'
import { sendEveryonePlayerLeaved } from './sendEveryonePlayerLeaved'
import { negativeLog } from '@/utils/negativeLog'
import { createMatch } from './createMatch'

export const onPeerClose = (peer: SimplePeer.Instance, userID: string) =>
  peer.on('close', () => {
    const otherHostRoomStatues = useOtherHostRoomStatus.getState().get()

    usePeers.getState().removePeer(userID)
    usePlayers.getState().removePlayer(userID)

    sendEveryonePlayerLeaved(userID)

    if (usePlayers.getState().get().count <= 1) {
      if (otherHostRoomStatues.matchInterval)
        clearInterval(otherHostRoomStatues.matchInterval)
    } else if (usePainterData.getState().isPainter(userID)) {
      if (otherHostRoomStatues.matchInterval)
        clearInterval(otherHostRoomStatues.matchInterval)
      createMatch()
    }

    negativeLog(`CONNECTION TO ${userID} CLOSED`)
  })
