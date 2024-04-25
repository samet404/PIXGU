import UsersSection from './components/UsersSection'
import CanvasTools from './components/CanvasTools'
import Canvases from './components/Canvases'
import Nav from './components/Nav'
import AnimatedDiv from './components/AnimatedDiv'

const JoinedRoom = () => {
  return (
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
  )
}

export default JoinedRoom
