import type { CanvasDataRef, PeersRef, WebRTCSignalData } from '@/types'
import type { Message, Realtime, RealtimeChannel } from 'ably'
import { simplePeer } from '@/utils'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { addPeer, handlePeerDatas } from './funcs'

/**
 * This hook subscribes to the 'offer' event on the user's connect channel.
 * When an offer is received, a peer connection is created and an answer is sent back user that offered.
 *
 * @param ablyClient - The Ably client
 * @param myConnectChannel - The user's connect channel
 * @param peersRef - The ref object containing the peer connections
 * @param myID - The user's ID
 * @param roomID - The room's ID
 */
export const useOffers = (
  ablyClient: Realtime,
  myConnectChannel: RealtimeChannel,
  roomID: string,
  canvasDataRef: CanvasDataRef,
  peersRef: PeersRef,
) => {
  useEffectOnce(() => {
    myConnectChannel.subscribe('offer', (msg: Message) => {
      const signal = msg.data as WebRTCSignalData
      const userID = msg.clientId!
      console.log(`OFFER RECEIVED FROM ${userID}`)

      const themConnectChannel = ablyClient.channels.get(
        `room:${roomID}:connect:${userID}`,
      )
      const peer = simplePeer()

      peer.on('signal', (data) => {
        themConnectChannel.publish('answer', data)
      })

      peer.signal(signal)

      peer.on('error', (e) => {
        throw new Error(e.message)
      })

      peer.on('connect', () => console.log(`CONNECTED TO ${userID}`))

      handlePeerDatas(peer, canvasDataRef, peersRef)
      addPeer(userID, peer, peersRef)
    })
  })
}
