import type { Realtime, Message, RealtimeChannel } from 'ably'
import type { CanvasDataRef, PeersRef } from '@/types'
import type { User } from 'lucia'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { simplePeer } from '@/utils/simplePeer'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { handlePeerDatas, addPeer } from './funcs'

/**
 * This hook subscribes to the 'enter' presence event on the room channel.
 * When a user enters the room, a peer offer is created and sent to the entered user.
 *
 * @param ablyClient - The Ably client
 * @param peersRef - The ref object containing the peer connections
 * @param myID - The user's ID
 * @param roomID - The room's ID
 * @param user - The user object
 * @param roomChannel - The room channel
 */
export const useEnters = (
  ablyClient: Realtime,
  peersRef: PeersRef,
  canvasDataRef: CanvasDataRef,
  myID: string,
  roomID: string,
  roomChannel: RealtimeChannel,
) => {
  useEffectOnce(() => {
    subscribeAblyPresence(roomChannel, 'enter', (msg: Message) => {
      const userID = msg.clientId!
      if (userID === myID) return null

      console.log(`USER ${userID} ENTERED`)
      console.log(`INITIATING PEER CONNECTION TO ${userID}`)

      const themConnectChannel = ablyClient.channels.get(
        `room:${roomID}:connect:${userID}`,
      )
      const peer = simplePeer({
        initiator: true,
      })

      peer.on('signal', (data) => {
        console.log(`SIGNALING TO ${userID}`)
        themConnectChannel.publish('offer', {
          userID: myID,
          signal: data,
        })
      })

      peer.on('connect', () => console.log(`CONNECTED TO ${userID}`))

      handlePeerDatas(peer, canvasDataRef, peersRef)

      addPeer(userID, peer, peersRef)
    })
  })
}
