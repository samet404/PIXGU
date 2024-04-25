import './_styles/scrollbars.css'
import { api } from '@/trpc/server'
import dynamic from 'next/dynamic'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))
const JoinWithPassContainer = dynamic(
  () => import('./_components/JoinWithPassContainer'),
)
const JoinRoomContainer = dynamic(
  () => import('./_components/JoinRoomContainer'),
)
const HydrateAtoms = dynamic(() => import('./_components/HydrateAtoms'))

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
  const isRoomHavePass = await api.gameRoom.isHavePass.query({
    roomID: urlRoomID,
  })

  if (isRoomHavePass)
    return (
      <HydrateAtoms roomID={urlRoomID}>
        <JoinWithPassContainer />
      </HydrateAtoms>
    )

  return (
    <HydrateAtoms roomID={urlRoomID}>
      <JoinRoomContainer />
    </HydrateAtoms>
  )
}

export default Room

type RoomParams = {
  params: {
    roomID: string
  }
}
