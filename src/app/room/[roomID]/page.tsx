import { Fragment } from 'react'
import UsersSection from './components/UsersSection'
import CanvasTools from './components/CanvasTools'
import Canvas from './components/Canvas'
import './styles/scrollbars.css'

const Game = () => {
  return (
    <Fragment>
      <div
        style={{
          backgroundColor: 'hsla(204, 100%, 11%, 1)',
          backgroundImage:
            'radial-gradient(at 100% 100%, hsla(54, 100%, 50%, 0.215) 0px, transparent 50%), radial-gradient(at 2% 0%, hsla(50, 100%, 50%, 0.255) 0px, transparent 50%)',
        }}
        id="rootDiv"
        className="flex h-full w-full flex-col overflow-y-scroll p-3"
      >
        <div className="flex h-full w-full animate-fade-down flex-row justify-between gap-2">
          <UsersSection />
          <div className="flex flex-col">
            <Canvas />
          </div>
          <CanvasTools />
        </div>
      </div>

      <div></div>
    </Fragment>
  )
}

export default Game
