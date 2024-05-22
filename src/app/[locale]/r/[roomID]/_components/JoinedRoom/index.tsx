import UsersSection from './_components/UsersSection'
import Nav from './_components/Nav'
import AnimatedDiv from './_components/AnimatedDiv'
import CanvasWrapper from './_components/CanvasWrapper'
import './_styles/scrollbars.css'
import CanvasTools from './_components/CanvasTools'

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
        <CanvasWrapper />
        <CanvasTools />
      </div>
    </div>
  )
}

export default JoinedRoom
