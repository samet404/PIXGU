import { useHostPeer } from '@/zustand/store/useHostPeer'
import { useSocketIO } from '@/zustand/store/useSocketIO'
import { hostJoined } from './hostJoined'
import type PixguPeer from '@/pixgu-peer/types'

export const receiveSignal = (roomID: string, myUserID: string) =>
  useSocketIO
    .getState()
    .io!.on('receive-webrtc-signal', (signal: PixguPeer.SignalData) => {
      console.log('receive-webrtc-signal: ', signal)
      if (!useHostPeer.getState().peer) hostJoined(roomID, myUserID)

      useHostPeer.getState().peer?.signal(signal)
    })
