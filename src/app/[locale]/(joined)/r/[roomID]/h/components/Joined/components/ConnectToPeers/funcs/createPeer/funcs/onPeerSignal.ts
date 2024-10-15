import type { WebRTCSignalData } from '@/types/webRTCSignalData'
import type SimplePeer from 'simple-peer'
import { goldLog } from '@/utils/goldLog'
import { useSocketIO } from '@/zustand/store'

export const onPeerSignal = (peer: SimplePeer.Instance, userID: string) => {
  peer.on('signal', async (signal: WebRTCSignalData) => {
    goldLog(`${signal.type.toUpperCase()} SENT TO ${userID}`, signal)

    console.log('sending signal data to player ' + userID)
    useSocketIO.getState().io!.emit('send-webrtc-signal', {
      userID,
      signal,
    })
  })
}
