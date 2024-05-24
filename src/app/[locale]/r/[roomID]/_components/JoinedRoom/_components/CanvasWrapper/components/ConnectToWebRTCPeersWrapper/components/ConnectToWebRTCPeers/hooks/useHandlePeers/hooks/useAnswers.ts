import type { PeersRef } from '@/types/webRTCPeersRef'
import type { WebRTCSignalData } from '@/types/webRTCSignalData'
import type { Message, RealtimeChannel } from 'ably'
import { useEffectOnce } from '@/hooks/useEffectOnce'

/**
 * This hook subscribes to the 'answer' event on the user's connect channel.
 * When an answer is received, the peer connection is updated with the received signal.
 * And the peer connection is established.
 *
 * @param myConnectChannel - The user's connect channel
 * @param peersRef - The ref object containing the peer connections
 */
export const useAnswers = (
  myConnectChannel: RealtimeChannel,
  peersRef: PeersRef,
) => {
  useEffectOnce(() => {
    myConnectChannel.subscribe('answer', (msg: Message) => {
      const userID = msg.clientId!
      const signal: WebRTCSignalData = msg.data

      console.log(`ANSWER RECEIVED FROM ${userID}`)

      peersRef.current[userID]!.peer.signal(signal)
    })
  })
}
