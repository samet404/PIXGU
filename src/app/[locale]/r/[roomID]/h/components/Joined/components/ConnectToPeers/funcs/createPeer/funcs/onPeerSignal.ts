import type { WebRTCSignalData } from '@/types/webRTCSignalData'
import type SimplePeer from 'simple-peer'
import { goldLog } from '@/utils/goldLog'
import { useSocketIO } from '@/zustand/store'

export const onPeerSignal = (peer: SimplePeer.Instance, userID: string) => {
  peer.on('signal', (signal: WebRTCSignalData) => {
    goldLog(`${signal.type.toUpperCase()} SENT TO ${userID}`, signal)

    console.log('send-webrtc-signal input: ', {
      userID,
      signal,
    })

    useSocketIO.getState().io!.emit('send-webrtc-signal', {
      userID,
      signal,
    })
  })
}
