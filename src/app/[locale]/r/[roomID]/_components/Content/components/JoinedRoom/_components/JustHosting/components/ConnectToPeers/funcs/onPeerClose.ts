import {
  usePeers,
  usePlayers,
  useOtherHostRoomStatus,
  usePainterData,
} from '@/zustand/store'
import type SimplePeer from 'simple-peer'
import { sendEveryonePlayerLeaved } from './sendEveryonePlayerLeaved'
import { negativeLog } from '@/utils/negativeLog'

export const onPeerClose = (peer: SimplePeer.Instance, userID: string) =>
  peer.on('close', () => {
    const otherHostRoomStatues = useOtherHostRoomStatus.getState().get()

    usePeers.getState().removePeer(userID)
    usePlayers.getState().removePlayer(userID)

    sendEveryonePlayerLeaved(userID)

    if (usePainterData.getState().isPainter(userID)) {
      clearTimeout(otherHostRoomStatues.matchTimeout!)
    }

    negativeLog(`CONNECTION TO ${userID} CLOSED`)
  })
