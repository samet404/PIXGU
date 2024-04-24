import './styles/scrollbars.css'
import { api } from '@/trpc/server'
import dynamic from 'next/dynamic'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))
const PasswordSection = dynamic(() => import('./components/PasswordSection'))
const JoinRoom = dynamic(() => import('./components/JoinRoom'))

const Room = async (params: RoomParams) => {
  const isLogged = await api.auth.isLogged.query()

  // If user is not logged in, redirect to login page
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

  if (isRoomHavePass) return <PasswordSection userID={userID} />

  return <JoinRoom roomID={urlRoomID} />
}

export default Room

type RoomParams = {
  params: {
    roomID: string
  }
}
