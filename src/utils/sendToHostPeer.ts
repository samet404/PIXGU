import type { WebRTCConnDataFromClient } from '@/types/webRTCConnData'
import { sendToPeer } from './sendToPeer'
import { useHostPeer } from '@/zustand/store/useHostPeer'

export const sendToHostPeer = (data: WebRTCConnDataFromClient) => {
  const hostPeer = useHostPeer.getState().peer
  if (!hostPeer || hostPeer === undefined) {
    console.error('HOST PEER NOT FOUND')
    return null
  }

  const secretKey = useHostPeer.getState().secretKey!

  sendToPeer(hostPeer, secretKey, data)
}
