import { CanvasesBottom } from './components/CanvasesBottom'
import AnimatedDiv from '../AnimatedDiv'
import Canvases from './components/Canvases'
import CanvasTools from './components/CanvasTools'
import Nav from './components/Nav'
import PlayersSection from './components/PlayersSection'

export const NotJustForHosting = () => {
  return (
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
  )
}
