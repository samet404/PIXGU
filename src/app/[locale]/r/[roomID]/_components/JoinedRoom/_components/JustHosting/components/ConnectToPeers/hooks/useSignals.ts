import type { WebRTCSignalData } from '@/types/webRTCSignalData'
import type { Message } from 'ably'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useContext } from 'react'
import { goldLog } from '@/utils/goldLog'
import {
  AblyClientContext,
  PeersContext,
  RoomIDContext,
} from '@/context/client'

/**
 * This hook subscribes to the 'signal' event on the user's connect channel.
 * When an signal is received, the peer connection is updated with the received signal.
 * And the peer connection is established or not.
 *
 */
export const useSignals = () => {
  const roomID = useContext(RoomIDContext)
  const ablyClient = useContext(AblyClientContext)!
  const peers = useContext(PeersContext)

  useEffectOnce(() => {
    const myConnectChannel = ablyClient.channels.get(
      `room:${roomID}:connect:host`,
    )

    myConnectChannel.subscribe('signal', (msg: Message) => {
      const userID = msg.clientId!
      const signal: WebRTCSignalData = msg.data

      goldLog(`${signal.type.toUpperCase()} RECEIVED FROM ${userID}`)

      console.log(signal)
      console.log(peers[userID])

      try {
        peers[userID]!.peer.signal(signal)
      } catch (error) {
        console.error(error)
      }
    })
  })
}
