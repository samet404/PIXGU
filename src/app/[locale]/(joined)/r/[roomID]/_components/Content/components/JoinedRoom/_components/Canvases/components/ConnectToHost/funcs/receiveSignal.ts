import { useHostPeer, useSocketIO } from '@/zustand/store'
import type { SignalData } from 'simple-peer'

export const receiveSignal = () =>
  useSocketIO
    .getState()
    .io!.on('receive-webrtc-signal', ({ signal }: ReceviedSignal) =>
      useHostPeer.getState().peer?.signal(signal),
    )

type ReceviedSignal = {
  userID: string
  signal: SignalData
}
