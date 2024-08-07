import type { WebRTCSignalData } from '@/types'
import type { Message } from 'ably'
import { goldLog, positiveLog, simplePeer } from '@/utils'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useContext } from 'react'
import { HostPeerCtx } from '@/context/client/react/hostPeerCtx'
import { handlePeerDatas } from './funcs'
import { useRoomPlayersDbInfo } from '@/zustand/store/useRoomPlayersDbInfo'
import {
  AblyClientContext,
  CanvasesMainDataContext,
  HostIDCtx,
  PainterDataContext,
  RoomIDContext,
  UserIDContext,
} from '@/context/client'

/**
 * This hook subscribes to the 'offer' event on the user's connect channel.
 * When an offer is received, a peer connection is created and an answer is sent back user that offered.
 */
export const useOffers = () => {
  const roomID = useContext(RoomIDContext)
  const ablyClient = useContext(AblyClientContext)!
  const hostID = useContext(HostIDCtx)
  const hostPeer = useContext(HostPeerCtx)
  const myUserID = useContext(UserIDContext)
  const canvasesMainData = useContext(CanvasesMainDataContext)
  const painterData = useContext(PainterDataContext)
  const remPlayerDbInfo = useRoomPlayersDbInfo((state) => state.remove)
  const addPlayerDbInfo = useRoomPlayersDbInfo((state) => state.add)

  const hostConnectChannel = ablyClient.channels.get(
    `room:${roomID}:connect:host`,
  )

  useEffectOnce(() => {
    const myConnectChannel = ablyClient.channels.get(
      `room:${roomID}:connect:${myUserID}`,
    )

    myConnectChannel.subscribe('signal', (msg: Message) => {
      const signal: WebRTCSignalData = msg.data
      const userID = msg.clientId!
      if (userID === myUserID && userID !== hostID) return null

      goldLog(`SIGNAL RECEIVED FROM HOST (${userID})`)

      const peer = simplePeer()

      peer.on('signal', (data) => {
        goldLog(`${data.type.toUpperCase()} SENT TO HOST (${userID})`)
        hostConnectChannel.publish('signal', data)
      })

      console.log(signal)
      peer.signal(signal)

      peer.on('error', (err) => {
        console.error(err)
        throw new Error('CONNECTING_TO_HOST_ERR')
      })

      peer.on('connect', () => {
        positiveLog(`CONNECTED TO ${userID}`)
        hostPeer.peer = peer

        handlePeerDatas(
          hostPeer,
          canvasesMainData!,
          painterData,
          addPlayerDbInfo,
          remPlayerDbInfo,
        )
      })
    })
  })
}
