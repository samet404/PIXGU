import type { Message } from 'ably'
import type { WebRTCSignalData } from '@/types'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { simplePeer } from '@/utils/simplePeer'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { handlePeerDatas, addPeer } from './funcs'
import {
  AblyClientContext,
  CanvasesDataContext,
  PeersContext,
  RoomIDContext,
} from '@/context/client'
import { useContext } from 'react'

/**
 * This hook subscribes to the 'enter' presence event on the room channel.
 * When a user enters the room, a peer offer is created and sent to the entered user.
 */
export const useEnters = () => {
  const ablyClient = useContext(AblyClientContext)!
  const myUserID = ablyClient.clientId
  const roomID = useContext(RoomIDContext)
  const peers = useContext(PeersContext)
  const canvasData = useContext(CanvasesDataContext)!

  useEffectOnce(() => {
    const roomChannel = ablyClient.channels.get(`room:${roomID}`)

    subscribeAblyPresence(roomChannel, 'enter', (msg: Message) => {
      const userID = msg.clientId!
      if (userID === myUserID) return null

      console.log(`USER ${userID} ENTERED`)
      console.log(`INITIATING PEER CONNECTION TO ${userID}`)

      const themConnectChannel = ablyClient.channels.get(
        `room:${roomID}:connect:${userID}`,
      )
      const peer = simplePeer({
        initiator: true,
      })

      peer.on('signal', (data: WebRTCSignalData) => {
        console.log(`SIGNALING TO ${userID}`)
        themConnectChannel.publish('offer', data)
      })

      peer.on('connect', () => console.log(`CONNECTED TO ${userID}`))

      handlePeerDatas(peer, peers, canvasData)
      addPeer(myUserID, peers, peer)
    })
  })
}
