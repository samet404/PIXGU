import type { WebRTCSignalData } from '@/types/webRTCSignalData'
import type { Message } from 'ably'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useContext } from 'react'
import {
  AblyClientContext,
  PeersContext,
  RoomIDContext,
} from '@/context/client'
import { goldLog } from '@/utils/goldLog'

/**
 * This hook subscribes to the 'answer' event on the user's connect channel.
 * When an answer is received, the peer connection is updated with the received signal.
 * And the peer connection is established.
 *
 */
export const useAnswers = () => {
  const roomID = useContext(RoomIDContext)
  const ablyClient = useContext(AblyClientContext)!
  const myUserID = ablyClient.clientId
  const peers = useContext(PeersContext)

  useEffectOnce(() => {
    const myConnectChannel = ablyClient.channels.get(
      `room:${roomID}:connect:${myUserID}`,
    )

    myConnectChannel.subscribe('answer', (msg: Message) => {
      const userID = msg.clientId!
      goldLog(`ANSWER RECEIVED FROM ${userID}`)

      const signal: WebRTCSignalData = msg.data

      peers[userID]!.peer.signal(signal)
    })
  })
}
