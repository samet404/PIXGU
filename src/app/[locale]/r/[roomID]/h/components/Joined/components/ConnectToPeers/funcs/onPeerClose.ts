import type SimplePeer from 'simple-peer'
import type Pusher from 'pusher-js'
import { playerLeaved } from './playerLeaved'

export const onPeerClose = (
  peer: SimplePeer.Instance,
  userID: string,
  soketiClient: Pusher,
  roomID: string,
) => peer.on('close', () => playerLeaved(soketiClient, userID, roomID))
