import type { WebRTCConnData } from '@/types'
import { usePeers } from '@/zustand/store/usePeers'
import { negativeLog } from './negativeLog'
import { sendToPeer } from './sendToPeer'

export const sendManyToPeerWithID = (userID: string, datas: WebRTCConnData[]) =>
  datas.forEach((data) => {
    const peer = usePeers.getState().get()[userID]?.peer
    if (!peer) {
      negativeLog(
        `Peer not found when sending data ${data.event} with ID`,
        userID,
      )

      return
    }

    const secretKey = usePeers.getState().secretKeys[userID]!
    sendToPeer(peer, secretKey, data)
  })
