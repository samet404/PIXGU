import './_styles/scrollbars.css'
import { getHostID, getRoomID, getUser, getUserID } from '@/context/server'
import { Providers } from './_components/Providers'
import { Suspense } from 'react'
import AnimatedDiv from './_components/AnimatedDiv'
import { Blur } from './_components/Blur'
import Canvases from './_components/Canvases'
import { CanvasesBottom } from './_components/CanvasesBottom'
import CanvasTools from './_components/CanvasTools'
import { Chats } from './_components/Chats'
import { DarkZone } from './_components/DarkZone'
import Nav from './_components/Nav'
import PlayersSection from './_components/PlayersSection'
import { LeftNav } from './_components/LeftNav'
import { Marketplace } from './_components/Marketplace'
import { ResetStates } from './_components/ResetStates'

const JoinedRoom = () => {
  const userID = getUserID()
  const hostID = getHostID()
  const roomID = getRoomID()
  const user = getUser()!

  const isHost = userID === hostID

  return (
    <Providers userID={userID} roomID={roomID} hostID={hostID} user={user}>
      <div className="relative flex h-full w-full flex-col">
        <ResetStates />
        <AnimatedDiv />
        <Nav />
        <div className="h-full w-full">
          <DarkZone />
          <Blur>
            <div className="h-full w-full">
              <Suspense>
                <Marketplace />
              </Suspense>
              <div
                id="rootDiv"
                className="relative flex h-full w-full animate-fade-down flex-row items-start justify-between gap-2 overflow-y-scroll px-2 pb-24 pt-2"
              >
                <div className="z-10 flex h-[90vh] w-[20%] flex-row gap-2">
                  <PlayersSection />
                  <LeftNav />
                </div>
                <div className="z-10 flex flex-col items-center gap-2 rounded-lg">
                  <Canvases />

                  <div className="flex w-full grow select-none flex-col items-center justify-center gap-3">
                    <CanvasesBottom />
                  </div>
                </div>
                <div className="flex h-[90vh] w-[25%] flex-col gap-2">
                  <CanvasTools />
                  <Chats />
                </div>
              </div>
            </div>
          </Blur>
        </div>
      </div>
    </Providers>
  )
}

export default JoinedRoom
