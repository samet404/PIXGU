import './_styles/scrollbars.css'
import {
  getGuest,
  getGuestID,
  getHostID,
  getRoomID,
  getUser,
  getUserID,
} from '@/context/server'
import { Providers } from './_components/Providers'
import { Suspense } from 'react'
import AnimatedDiv from './_components/AnimatedDiv'
import { Blur } from './_components/Blur'
import Canvases from './_components/Canvases'
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
import CanvasTools from './_components/CanvasTools'
import { Shortcuts } from './_components/Shortcuts'
import { ToolAlert } from './_components/ToolAlert'
import { CanvasToolsShadow } from './_components/CanvasToolsShadow'
import { LetterHint } from './_components/Letterhint'
import { api } from '@/trpc/server'
import { UseTimersWorker } from './_components/UseTimersWorker'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['700', '600', '500', '400', '800', '300', '200', '900', '100'],
})

const JoinedRoom = async () => {
  const userID = getUserID()
  const hostID = getHostID()
  const roomID = getRoomID()
  const user = getUser()
  const guest = getGuest()

  const havePassword = await api.gameRoom.isHavePass.query({
    roomID,
  })

  return (
    <div
      className={`${outfit.className} relative flex h-full w-full flex-col`}
    >    <Providers
      havePassword={havePassword}
      userID={userID}
      roomID={roomID}
      hostID={hostID}
      user={user}
      guest={guest}
    >
        <div
          className='relative flex h-full w-full flex-col'
        >
          <UseTimersWorker />
          <AnimatedDiv />
          <Nav />
          <div className="h-full w-full">
            <CanvasToolsShadow />
            <ToolAlert />
            <ResetStates />
            <CanvasTools />
            <GameEnd userID={user ? user.id : guest!.ID} />
            <Suspense>
              <Blur />
            </Suspense>
            <Shortcuts />
            <div className="h-[100vh] w-full">
              <Suspense>
                <LetterHint />
                <Marketplace />
                <Powerups />
              </Suspense>
              <div
                id="rootDiv"
                className="relative flex h-full w-full animate-fade flex-row items-start justify-between gap-2 overflow-y-scroll px-2 pb-24 pt-2"
              >
                <Spectator />

                <div className="z-10 flex h-[90vh] flex-col gap-2 lg:w-[12rem] xl:w-[15rem]">
                  <PlayersSection />
                </div>
                <div className="z-10 flex grow flex-col items-center gap-2 rounded-lg">
                  <Canvases />
                </div>
                <div className="flex h-[90vh] max-w-[20rem] flex-col gap-2 lg:w-[12rem] xl:w-[15rem]">
                  <LeftNav />
                  <Chats />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Providers>
    </div>
  )
}

export default JoinedRoom
