import type PixguPeer from '@/pixgu-peer/types'
import { usePeers } from '@/zustand/store/usePeers'
import type { Socket } from 'socket.io-client'

export const receiveSignal = (io: Socket) =>
  io.on('receive-webrtc-signal', ({ userID, signal }: ReceviedSignal) => {
    usePeers.getState().peers[userID]!.peer.signal(signal)
  })

type ReceviedSignal = {
  userID: string
  signal: PixguPeer.SignalData
}
