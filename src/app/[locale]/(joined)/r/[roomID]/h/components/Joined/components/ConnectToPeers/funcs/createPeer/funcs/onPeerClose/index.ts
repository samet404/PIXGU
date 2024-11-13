import type SimplePeer from 'simple-peer'
// import { playerLeaved } from './funcs/playerLeaved'

export const onPeerClose = (
  peer: SimplePeer.Instance,
  userID: string,
  roomID: string,
) =>
  peer.on('close', () => {
    console.error('PEER CLOSED', userID)
    // playerLeaved(userID, roomID)
  })
