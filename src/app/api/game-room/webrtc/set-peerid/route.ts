import { api } from '@/trpc/server'

export async function POST(req: Request) {
  const { peerID, roomID } = await req.json()

  await api.gameRoom.setNewPeerID.mutate({ peerID: peerID, roomID: roomID })

  return new Response(null, { status: 200 })
}
