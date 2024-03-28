import UsersSection from './components/UsersSection'
import CanvasTools from './components/CanvasTools'
import Canvas from './components/Canvas'
import './styles/scrollbars.css'
import { api } from '@/src/trpc/server'
import { PasswordSection } from './components/PasswordSection'
import Nav from './components/Nav'
import HydrateAtoms from './components/HydrateAtoms'
import AnimatedDiv from './components/AnimatedDiv'

type RoomParams = {
  params: {
    roomID: string
  }
}

const Room = async (params: RoomParams) => {
  const userID = await api.user.getSessionUserID.query()

  if (!userID) throw new Error('UNAUTHORIZED')

  const urlRoomID = params.params.roomID

  const isRoomHavePass = await api.gameRoom.isHavePass_ByID.query(urlRoomID)
  const playingRoomID = await api.gameRoom.getPlayingRoom.query()

  if (playingRoomID !== urlRoomID && isRoomHavePass) return <PasswordSection />

  if (playingRoomID !== urlRoomID && !isRoomHavePass)
    throw new Error('Something went wrong. Please try again.')

  const players = await api.gameRoom.getPlayingRoomUsers.query()

  return (
    <HydrateAtoms userID={userID} players={players} roomID={urlRoomID}>
      <div className="relative flex h-full w-full flex-col">
        <AnimatedDiv />
        <Nav />
        <div
          id="rootDiv"
          className="flex h-full w-full animate-fade-down flex-row items-start justify-between gap-2 overflow-y-scroll p-2"
        >
          <UsersSection />
          <Canvas />
          <CanvasTools />
        </div>
      </div>
    </HydrateAtoms>
  )
}

export default Room
