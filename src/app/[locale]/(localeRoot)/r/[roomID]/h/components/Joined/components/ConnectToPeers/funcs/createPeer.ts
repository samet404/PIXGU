import { simplePeer } from '@/utils/simplePeer'
import { subscribePusher } from '@/utils/subscribePusher'
import { usePeers } from '@/zustand/store'
import { signalData } from './signalData'
import { onPeerConnect } from './onPeerConnect'
import { onPeerSignal } from './onPeerSignal'
import { onPeerError } from './onPeerError'
import { onPeerClose } from './onPeerClose'
import type Pusher from 'pusher-js'
import type { User } from 'lucia'
import type { WebRTC_signalDataToHost } from '@/types/pusher'

export const createPeer = (
  soketiClient: Pusher,
  roomID: string,
  userID: string,
  pusherMember: {
    id: string
    info: Omit<User, 'id'>
  },
  myUserID: string,
) => {
  const peer = simplePeer({
    initiator: true,
  })

  usePeers.getState().add({
    ID: userID,
    peer,
  })

  const myConnectChannel = subscribePusher(
    soketiClient,
    `private-room-${roomID}:connect_to_host:${userID}`,
  )

  myConnectChannel.bind('subscription_succeeded', (data: any) => {
    console.log('subscription_succeeded', data)
  })

  myConnectChannel.bind('subscription_error', (data: any) => {
    console.log('subscription_error', data)
  })
  myConnectChannel.bind('webRTC_signal', (data: WebRTC_signalDataToHost) =>
    signalData(data),
  )

  onPeerSignal(peer, userID, roomID)
  onPeerConnect(peer, userID, roomID, {
    id: userID,
    ...pusherMember.info,
  })
  onPeerError(peer, userID, soketiClient, roomID)
  onPeerClose(peer, userID, soketiClient, roomID)
}
