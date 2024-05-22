import type { Realtime, Message, RealtimeChannel } from 'ably'
import type { PeersRef, WebRTCConnData } from '@/types'
import type { User } from 'lucia'
import { setPlayerAtom } from '@/app/[locale]/r/[roomID]/_components/JoinedRoom/_atoms'
import { useSetAtom } from 'jotai'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { simplePeer } from '@/utils/simplePeer'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { handlePeerDatas } from './funcs'

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
export const useEnters = ({
  ablyClient,
  peersRef,
  myID,
  roomID,
  user,
  roomChannel,
}: Args) => {
  const setPlayer = useSetAtom(setPlayerAtom)

  useEffectOnce(() => {
    subscribeAblyPresence(roomChannel, 'enter', (msg: Message) => {
      const userID = msg.clientId!

      if (userID === myID) return null

      console.log(`USER ${userID} ENTERED`)

      console.log(`INITIATING PEER CONNECTION TO ${userID}`)

      const peer = simplePeer({
        initiator: true,
      })

      const themConnectChannel = ablyClient.channels.get(
        `room:${roomID}:connect:${userID}`,
      )

      peer.on('signal', (data) => {
        console.log(`SIGNALING TO ${userID}`)
        themConnectChannel.publish('offer', {
          userID: myID,
          signal: data,
        })
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
  peersRef: PeersRef
  myID: string
  roomID: string
  user: User
  roomChannel: RealtimeChannel
}
