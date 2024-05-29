import './_styles/scrollbars.css'
import PlayersSection from './_components/PlayersSection'
import Nav from './_components/Nav'
import AnimatedDiv from './_components/AnimatedDiv'
import CanvasTools from './_components/CanvasTools'
import Providers from './_components/Providers'
import Canvases from './_components/Canvases'
import { getRoomID, getUserID } from '@/context/server'
import { CanvasesBottom } from './_components/CanvasesBottom'

const JoinedRoom = () => {
  const userID = getUserID()
  const roomID = getRoomID()

  return (
    <Providers userID={userID} roomID={roomID}>
      <div className="relative flex h-full w-full flex-col">
        <AnimatedDiv />
        <Nav />

        <div
          id="rootDiv"
          className="flex h-full w-full animate-fade-down flex-row items-start justify-between gap-2 overflow-y-scroll p-2"
        >
          <PlayersSection />
          <div className="flex select-none flex-col items-center gap-[0.1rem]">
            <Canvases />
            <CanvasesBottom />
          </div>

          <CanvasTools />
        </div>
      </div>
    </Providers>
  )
}

export default JoinedRoom
