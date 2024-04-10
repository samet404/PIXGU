'use server'

import { api } from '@/trpc/server'

export const test = async (peerID: string) => {
  console.log('setPeerID', peerID)
  await api.gameRoom.setNewPeerID.mutate({
    peerID: peerID,
    roomID: 'test',
  })
}
