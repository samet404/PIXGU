import type { PeersRef, WebRTCConnData, WebRTCSignalData } from '@/types'
import type { Message, Realtime, RealtimeChannel } from 'ably'
import type { User } from 'lucia'
import { setPlayerAtom } from '@/app/[locale]/r/[roomID]/_components/JoinedRoom/_atoms'
import { simplePeer } from '@/utils'
import { decodedOnPeerData } from '@/utils/decodedOnPeerData'
import { useSetAtom } from 'jotai'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { handlePeerDatas } from './funcs'

/**
 * This hook subscribes to the 'offer' event on the user's connect channel.
 * When an offer is received, a peer connection is created and an answer is sent back user that offered.
 *
 * @param ablyClient - The Ably client
 * @param myConnectChannel - The user's connect channel
 * @param peersRef - The ref object containing the peer connections
 * @param myID - The user's ID
 * @param roomID - The room's ID
 * @param user - The user object
 */
export const useOffers = ({
  ablyClient,
  myConnectChannel,
  peersRef,
  myID,
  roomID,
  user,
}: Args) => {
  const setPlayer = useSetAtom(setPlayerAtom)

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

      peer.on('connect', () => {
        console.log(`CONNECTED TO ${userID}`)

        const meetInfo: WebRTCConnData = {
          event: 'meet',
          userInfo: {
            ID: myID,
            name: user.usernameWithUsernameID,
            pfp: user.profilePicture,
          },
        }

        peer.send(JSON.stringify(meetInfo))
      })

      handlePeerDatas({ peer, setPlayer })

      peersRef.current = {
        [userID]: { peer: peer },
        ...peersRef.current,
      }
    })
  })
}

type Args = {
  ablyClient: Realtime
  myConnectChannel: RealtimeChannel
  peersRef: PeersRef
  myID: string
  roomID: string
  user: User
}
