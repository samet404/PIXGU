import { Suspense } from 'react'
import AnimatedDiv from '../AnimatedDiv'
import { Blur } from './components/Blur'
import Canvases from './components/Canvases'
import { CanvasesBottom } from './components/CanvasesBottom'
import CanvasTools from './components/CanvasTools'
import { Chats } from './components/Chats'
import { DarkZone } from './components/DarkZone'
import Nav from './components/Nav'
import PlayersSection from './components/PlayersSection'
import { LeftButtons } from './components/LeftButtons'
import { Marketplace } from './components/Marketplace'
import { ResetStates } from './components/ResetStates'

export const NotJustForHosting = () => {
  return (
    <div className="relative flex h-full w-full flex-col">
      <ResetStates />
      <AnimatedDiv />
      <Nav />
      <Blur>
        <div id="rootDiv" className="h-full w-full">
          <DarkZone />
          <Marketplace />
          <Suspense>
            <PlayersSection />
          </Suspense>
          <div
            id="rootDiv"
            className="relative flex h-full w-full animate-fade-down flex-row items-start justify-between gap-2 overflow-y-scroll px-2 pb-24 pt-2"
          >
            <LeftButtons />
            <div className="flex flex-col items-center rounded-lg border-[0.2rem] border-[#ffffff37] ">
              <Canvases />

              <div className="flex w-full grow select-none flex-col items-center justify-center gap-3">
                <CanvasesBottom />
              </div>
            </div>
            <CanvasTools />
            <Chats />
          </div>
        </div>
      </Blur>
    </div>
  )
}
