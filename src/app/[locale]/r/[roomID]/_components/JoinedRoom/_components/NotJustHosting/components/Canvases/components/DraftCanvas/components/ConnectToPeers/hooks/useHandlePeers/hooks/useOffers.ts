import type { WebRTCConnData, WebRTCSignalData } from '@/types'
import type { Message } from 'ably'
import { goldLog, positiveLog, simplePeer } from '@/utils'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useContext } from 'react'
import {
  AblyClientContext,
  CanvasesMainDataContext,
  HostIDCtx,
  PainterDataContext,
  RoomIDContext,
  UserIDContext,
} from '@/context/client'
import { HostPeerCtx } from '@/context/client/react/hostPeerCtx'
import { handlePeerDatas } from './funcs'
import { useRoomPlayersIDsStore } from '@/zustand/store/useRoomPlayersIDsStore'

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
  const updatePlayerIDState = useRoomPlayersIDsStore((s) => s.update)

  useEffectOnce(() => {
    const myConnectChannel = ablyClient.channels.get(
      `room:${roomID}:connect:${myUserID}`,
    )

    myConnectChannel.subscribe('offer', (msg: Message) => {
      const offer: WebRTCSignalData = msg.data
      const userID = msg.clientId!
      if (userID === myUserID && userID !== hostID) return null

      goldLog(`OFFER RECEIVED FROM HOST (${userID})`)

      const themConnectChannel = ablyClient.channels.get(
        `room:${roomID}:connect:${userID}`,
      )

      const peer = simplePeer()

      peer.on('signal', (data) => {
        if (data.type === 'answer') {
          goldLog(`ANSWER SENT TO HOST (${userID})`)
          themConnectChannel.publish('answer', data)
        }
      })

      console.log(offer)
      peer.signal(offer)

      peer.on('error', (err) => {
        console.error(err)
        throw new Error('CONNECTING_TO_HOST_ERR')
      })

      peer.on('connect', () => {
        positiveLog(`CONNECTED TO ${userID}`)
        hostPeer!.peer = peer

        handlePeerDatas(
          hostPeer!,
          canvasesMainData!,
          painterData,
          updatePlayerIDState,
        )
      })
    })
  })
}
