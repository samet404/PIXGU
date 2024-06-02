import type { WebRTCSignalData } from '@/types'
import type { Message } from 'ably'
import { negativeLog, positiveLog, simplePeer } from '@/utils'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { addPeer, handlePeerDatas } from './funcs'
import { useContext } from 'react'
import {
  AblyClientContext,
  CanvasesDataContext,
  PeersContext,
  RoomIDContext,
  UserIDContext,
} from '@/context/client'
import { useInterval } from 'usehooks-ts'

/**
 * This hook subscribes to the 'offer' event on the user's connect channel.
 * When an offer is received, a peer connection is created and an answer is sent back user that offered.
 */
export const useOffers = () => {
  const roomID = useContext(RoomIDContext)
  const ablyClient = useContext(AblyClientContext)!
  const peers = useContext(PeersContext)
  const canvasData = useContext(CanvasesDataContext)!
  const myUserID = useContext(UserIDContext)

  useInterval(() => console.log(peers), 5000)

  useEffectOnce(() => {
    const myConnectChannel = ablyClient.channels.get(
      `room:${roomID}:connect:${myUserID}`,
    )

    myConnectChannel.subscribe('offer', (msg: Message) => {
      const signal: WebRTCSignalData = msg.data
      const userID = msg.clientId!
      if (userID === myUserID) return null

      positiveLog(`OFFER RECEIVED FROM ${userID}`)

      const themConnectChannel = ablyClient.channels.get(
        `room:${roomID}:connect:${userID}`,
      )
      const peer = simplePeer()

      peer.on('signal', (data) => {
        themConnectChannel.publish('answer', data)
      })

      peer.signal(signal)

      peer.on('error', (err) => {
        negativeLog(`ERROR IN PEER CONNECTION TO ${userID}`)
        console.error(err)
      })
      peer.on('connect', () => positiveLog(`CONNECTED TO ${userID}`))

      peers[userID] = {
        peer,
        isPainter: false,
      }

      handlePeerDatas(peer, peers, canvasData)
      addPeer(userID, peers, peer)
    })
  })
}
