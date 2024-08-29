import { negativeLog } from '@/utils/negativeLog'
import { toPusherKey } from '@/utils/toPusherKey'
import type Pusher from 'pusher-js'
import type SimplePeer from 'simple-peer'

export const onPeerError = (
  peer: SimplePeer.Instance,
  userID: string,
  soketiClient: Pusher,
  roomID: string,
) =>
  peer.on('error', (err) => {
    negativeLog(`ERROR IN PEER CONNECTION TO ${userID}`)
    console.error(err)
    soketiClient.unsubscribe(
      toPusherKey(`private-room-${roomID}:connect_to_host:${userID}`),
    )
  })
