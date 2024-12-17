import { useHostPeer, useSocketIO } from '@/zustand/store'
import type { SignalData } from 'simple-peer'
import { hostJoined } from './hostJoined'

export const receiveSignal = (roomID: string, myUserID: string) =>
  useSocketIO
    .getState()
    .io!.on('receive-webrtc-signal', (signal: SignalData) => {
      console.log('receive-webrtc-signal: ', signal)
      if (!useHostPeer.getState().peer) hostJoined(roomID, myUserID)

      useHostPeer.getState().peer?.signal(signal)
    })
