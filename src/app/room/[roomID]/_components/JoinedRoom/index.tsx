import UsersSection from './components/UsersSection'
import CanvasTools from './components/CanvasTools'
import Canvases from './components/Canvases'
import Nav from './components/Nav'
import HydrateAtoms from './components/HydrateAtoms'
import AnimatedDiv from './components/AnimatedDiv'

type JoinedRoomProps = {
  userID: string
  players: {
    userID: string
    username: string
    profilePicture: string | null
  }[]
  urlRoomID: string
}

const JoinedRoom = ({ userID, players, urlRoomID }: JoinedRoomProps) => {
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
          <Canvases />
          <CanvasTools />
        </div>
      </div>
    </HydrateAtoms>
  )
}

export default JoinedRoom
