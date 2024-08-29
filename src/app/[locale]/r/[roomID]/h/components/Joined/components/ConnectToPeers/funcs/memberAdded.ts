import type { User } from 'lucia'
import { simplePeer, positiveLog, toPusherKey } from '@/utils'
import { usePeers } from '@/zustand/store'
import { onPeerSignal } from './onPeerSignal'
import { onPeerError } from './onPeerError'
import { onPeerConnect } from './onPeerConnect'
import { onPeerClose } from './onPeerClose'
import type Pusher from 'pusher-js'
import type { WebRTC_signalDataToHost } from '@/types/pusher'
import { signalData } from './signalData'

export const memberAdded = (
  member: {
    id: string
    info: User
  },
  myUserID: string,
  roomID: string,
  soketiClient: Pusher,
) => {
  console.log('memberAdded', member)
  const userID = member.id

  positiveLog(`USER ${userID} ENTERED >`)
  positiveLog(`INITIATING PEER CONNECTION TO ${userID}`)

  const peer = simplePeer({
    initiator: true,
  })

  usePeers.getState().add({
    ID: userID,
    peer,
  })

  const myConnectChannel = soketiClient.subscribe(
    toPusherKey(`private-room-${roomID}:connect_to_host:${userID}`),
  )

  myConnectChannel.bind('pusher:subscription_succeeded', (data: any) => {
    console.log('subscription_succeeded', data)
  })

  myConnectChannel.bind('pusher:subscription_error', (data: any) => {
    console.log('subscription_error', data)
  })
  myConnectChannel.bind('webRTC_signal', (data: WebRTC_signalDataToHost) =>
    signalData(data),
  )

  onPeerSignal(peer, userID, roomID)
  onPeerConnect(peer, userID, roomID, member.info)
  onPeerError(peer, userID, soketiClient, roomID)
  onPeerClose(peer, userID, soketiClient, roomID)
}
