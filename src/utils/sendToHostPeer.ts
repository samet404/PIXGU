import type { WebRTCConnData } from '@/types/webRTCConnData'
import { sendToPeer } from './sendToPeer'
import { useHostPeer } from '@/zustand/store/useHostPeer'

export const sendToHostPeer = (data: WebRTCConnData) => {
  const hostPeer = useHostPeer.getState().peer
  if (!hostPeer || hostPeer === undefined) {
    console.error('HOST PEER NOT FOUND')
    return null
  }

  sendToPeer(hostPeer, data)
}
