import { usePeers, useSocketIO } from '@/zustand/store'
import type { SignalData } from 'simple-peer'

export const receiveSignal = () =>
  useSocketIO
    .getState()
    .io!.on('receive-webrtc-signal', ({ userID, signal }: ReceviedSignal) =>
      usePeers.getState().peers[userID]!.peer.signal(signal),
    )

type ReceviedSignal = {
  userID: string
  signal: SignalData 
}
