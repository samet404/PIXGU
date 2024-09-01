import type { WebRTCConnData } from '@/types'
import { usePeers } from '@/zustand/store'

export const sendManyToPeerWithID = (userID: string, datas: WebRTCConnData[]) =>
  datas.forEach((data) => {
    const peer = usePeers.getState().get()[userID]?.peer
    if (!peer) {
      import('@/utils/negativeLog').then(({ negativeLog }) =>
        negativeLog(
          `Peer not found when sending data ${data.event} with ID`,
          userID,
        ),
      )

      return
    }

    import('./sendToPeer').then(({ sendToPeer }) => sendToPeer(peer, data))
  })
