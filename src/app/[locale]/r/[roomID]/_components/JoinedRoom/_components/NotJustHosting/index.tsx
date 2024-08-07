import { CanvasesBottom } from './components/CanvasesBottom'
import AnimatedDiv from '../AnimatedDiv'
import Canvases from './components/Canvases'
import CanvasTools from './components/CanvasTools'
import Nav from './components/Nav'
import PlayersSection from './components/PlayersSection'
import Image from 'next/image'
import { faMessage, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Urbanist } from 'next/font/google'
import sendImg from '@/png/icons8-send-30-black.png'
import { Chats } from './components/Chats'

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
        <div className="flex grow select-none flex-col items-center justify-center gap-3">
          <Canvases />
          {/* <CanvasesBottom /> */}
          <Chats />
        </div>

        <CanvasTools />
      </div>
    </div>
  )
}
