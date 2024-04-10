'use server'

import { api } from '@/trpc/server'

export const remPeerID = async (peerID: string) => {
  console.log('remPeerID', peerID)
  await api.gameRoom.remPeerID.mutate({
    peerID: peerID,
    roomID: 'test',
  })
}
