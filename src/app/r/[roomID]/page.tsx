import './_styles/scrollbars.css'
import { api } from '@/trpc/server'
import dynamic from 'next/dynamic'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))
const JoinWithPassContainer = dynamic(
  () => import('./_components/JoinWithPassContainer'),
)
const JoinedRoom = dynamic(() => import('./_components/JoinedRoom'))

const Room = async (params: RoomParams) => {
  const isLogged = await api.auth.isLogged.query()

  if (!isLogged)
    return (
      <ErrDisplay
        msg="UNAUTHORIZED"
        reason="You need to be logged in to join a room"
        code={401}
        redirectTo="/login"
      />
    )

  const urlRoomID = params.params.roomID
  const roomExists = await api.gameRoom.isExits.query({ roomID: urlRoomID })

  if (!roomExists) return (await import('next/navigation')).notFound()

  const isRoomHavePass = await api.gameRoom.isHavePass.query({
    roomID: urlRoomID,
  })

  if (isRoomHavePass) return <JoinWithPassContainer />
  return <JoinedRoom />
}

export default Room

type RoomParams = {
  params: {
    roomID: string
  }
}
