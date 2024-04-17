import './styles/scrollbars.css'
import { api } from '@/trpc/server'
import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'

const PasswordSection = dynamic(() => import('./components/PasswordSection'))
const JoinRoom = dynamic(() => import('./components/JoinRoom'))
const JoinedRoom = dynamic(() => import('./components/JoinedRoom'))

const Room = async (params: RoomParams) => {
  const userID = await api.auth.getUserID.query()

  // If user is not logged in, redirect to login page
  if (!userID) redirect('/login')

  const urlRoomID = params.params.roomID

  const isRoomHavePass = await api.gameRoom.isHavePass_ByID.query(urlRoomID)
  const playingRoomID = await api.gameRoom.getPlayingRoom.query()

  if (playingRoomID !== urlRoomID && isRoomHavePass)
    return <PasswordSection userID={userID} />
  if (playingRoomID !== urlRoomID) return <JoinRoom roomID={urlRoomID} />

  if (playingRoomID === urlRoomID) {
    const players = await api.gameRoom.getPlayingRoomUsers.query()

    return (
      <JoinedRoom userID={userID} players={players} urlRoomID={urlRoomID} />
    )
  }

  throw new Error('Something went wrong in room page hmm 🤔')
}

export default Room

type RoomParams = {
  params: {
    roomID: string
  }
}
