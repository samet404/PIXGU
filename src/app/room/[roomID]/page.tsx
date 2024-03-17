import UsersSection from './components/UsersSection'
import CanvasTools from './components/CanvasTools'
import Canvas from './components/Canvas'
import './styles/scrollbars.css'
import { api } from '@/src/trpc/server'
import { PasswordSection } from './components/PasswordSection'
import Nav from './components/Nav'
import HydrateAtoms from './components/HydrateAtoms'

type RoomParams = {
  params: {
    roomID: string
  }
}

const Room = async (params: RoomParams) => {
  const urlRoomID = params.params.roomID

  const isRoomHavePass = await api.gameRoom.isHavePass_ByID.query(urlRoomID)
  const playingRoomID = await api.gameRoom.getPlayingRoom.query()

  if (playingRoomID !== urlRoomID && isRoomHavePass) return <PasswordSection />

  if (playingRoomID !== urlRoomID && !isRoomHavePass)
    throw new Error('Something went wrong. Please try again.')

  return (
    <HydrateAtoms roomID={urlRoomID}>
      <div
        style={{
          backgroundColor: 'hsla(204, 100%, 11%, 1)',
          backgroundImage:
            'radial-gradient(at 100% 100%, hsla(182, 100%, 50%, 0.215) 0px, transparent 50%), radial-gradient(at 2% 0%, hsla(193, 100%, 50%, 0.255) 0px, transparent 50%)',
        }}
        className="flex h-full w-full flex-col"
      >
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
