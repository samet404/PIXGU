import './_styles/scrollbars.css'
import { api } from '@/trpc/server'
import type { OverrideProps } from '@/types/overrideProps'
import type { User } from 'lucia'
import dynamic from 'next/dynamic'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))
const PasswordSection = dynamic(() => import('./_components/PasswordSection'))
const JoinRoom = dynamic(() => import('./_components/JoinRoom'))

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

  const selectedUserValues = {
    id: true,
    profilePicture: true,
    usernameWithUsernameID: true,
  } as const

  type getUserBySelectingType = OverrideProps<
    User,
    { data: typeof selectedUserValues }
  >

  const user = (await api.auth.getUserBySelecting.query(
    selectedUserValues,
  )) as getUserBySelectingType

  if (isRoomHavePass) return <PasswordSection ={userID} />

  return <JoinRoom roomID={urlRoomID} />
}

export default Room

type RoomParams = {
  params: {
    roomID: string
  }
}
