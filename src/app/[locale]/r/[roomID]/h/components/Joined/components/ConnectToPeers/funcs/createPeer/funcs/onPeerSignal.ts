import type PixguPeer from '@/pixgu-peer/types'
import type { WebRTCSignalData } from '@/types/webRTCSignalData'
import { goldLog } from '@/utils/goldLog'
import { useSocketIO } from '@/zustand/store/useSocketIO'

export const onPeerSignal = (peer: PixguPeer.Instance, userID: string) => {
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
