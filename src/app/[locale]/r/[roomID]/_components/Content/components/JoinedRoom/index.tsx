import './_styles/scrollbars.css'
import { getHostID, getRoomID, getUser, getUserID } from '@/context/server'
import { Providers } from './_components/Providers'
import { Suspense } from 'react'
import AnimatedDiv from './_components/AnimatedDiv'
import { Blur } from './_components/Blur'
import bgImg from '@/png/gamebg.png'
import Canvases from './_components/Canvases'
import CanvasTools from './_components/CanvasTools'
import { Chats } from './_components/Chats'
import Nav from './_components/Nav'
import PlayersSection from './_components/PlayersSection'
import { LeftNav } from './_components/LeftNav'
import { Marketplace } from './_components/Marketplace'
import { ResetStates } from './_components/ResetStates'
import { Spectator } from './_components/Spectator'
import { Outfit } from 'next/font/google'
import { GameEnd } from './_components/GameEnd'
import { Powerups } from './_components/Powerups'
import Image from 'next/image'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['700', '600', '500', '400', '300', '200', '100'],
})

const JoinedRoom = () => {
  const userID = getUserID()
  const hostID = getHostID()
  const roomID = getRoomID()
  const user = getUser()!

  const isHost = userID === hostID

  return (
    <Providers userID={userID} roomID={roomID} hostID={hostID} user={user}>
      <div
        className={`${outfit.className} relative flex h-full w-full flex-col`}
      >
        <ResetStates />
        <AnimatedDiv />
        <Nav />
        <div className="h-full w-full">
          <GameEnd userID={userID} />
          <Suspense>
            <Blur />
          </Suspense>
          <div className="h-[100vh] w-full">
            <Suspense>
              <Marketplace />
              <Powerups />
            </Suspense>
            <div
              id="rootDiv"
              className="relative flex h-full w-full animate-fade-down flex-row items-start justify-between gap-2 overflow-y-scroll px-2 pb-24 pt-2"
            >
              <Spectator />

              <div className="z-10 flex h-[90vh] flex-col gap-2 lg:w-[12rem] xl:w-[15rem]">
                <LeftNav />
                <PlayersSection />
              </div>
              <div className="z-10 flex grow flex-col items-center gap-2 rounded-lg">
                <Canvases />
              </div>
              <div className="flex h-[90vh] max-w-[20rem] flex-col gap-2 lg:w-[12rem] xl:w-[15rem]">
                <CanvasTools />
                <Chats />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Providers>
  )
}

export default JoinedRoom
