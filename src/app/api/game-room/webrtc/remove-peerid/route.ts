import { api } from '@/trpc/server'

export async function POST(req: Request) {
  const { peerID, roomID } = await req.json()

  await api.gameRoom.remPeerID.mutate({ peerID: peerID, roomID: roomID })
}
