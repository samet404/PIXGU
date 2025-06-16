import './_styles/scrollbars.css'
import { Providers } from './_components/Providers'
import AnimatedDiv from './_components/AnimatedDiv'
import { Status } from './_components/Status'
import { Canvases } from './_components/Canvases'
import { Chats } from './_components/Chats'
import { Nav } from './_components/Nav'
import PlayersSection from './_components/PlayersSection'
import { LeftNav } from './_components/LeftNav'
import { ResetStates } from './_components/ResetStates'
import { Outfit } from 'next/font/google'
import { GameEnd } from './_components/GameEnd'
import { Powerups } from './_components/Powerups'
import { CanvasTools } from './_components/CanvasTools'
import { Shortcuts } from './_components/Shortcuts'
import { api } from '@/trpc/server'
import type { Locale } from '@/types/locale'
import { redisDb } from '@/db/redis'
import { notFound } from 'next/navigation'
import { PainterToolGuide } from './_components/PainterToolGuide'
import { getLangObj } from './lang'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['700', '600', '500', '400', '800', '300', '200', '900', '100'],
})

const JoinedRoom = async ({ roomID, locale }: Props) => {
  const havePassword = await api.gameRoom.isHavePass.query({
    roomID,
  })

  const hostID = await redisDb.get(`room:${roomID}:host_ID`)
  if (!hostID) notFound()

  const guest = await api.auth.getGuest.query()
  const langObj = await getLangObj(locale)

  return (
    <div className={`${outfit.className} relative flex h-full w-full flex-col`}>
      <Providers
        locale={locale}
        havePassword={havePassword}
        userID={guest!.ID}
        roomID={roomID}
        hostID={hostID}
        guest={guest!!}
      >
        <div className="relative flex h-full w-full flex-col">
          <UseTimersWorker />
          <AnimatedDiv />
          <Nav langObj={langObj.nav} />
          <div className="h-full w-full">
            <PainterToolGuide text={langObj.painterToolGuideText} />
            <CanvasToolsShadow />
            <ToolAlert />
            <ResetStates />
            <CanvasTools langObj={langObj.canvasTools} />
            <GameEnd userID={user ? user.id : guest!.ID} />
            <Status langObj={langObj.status} />
            <Shortcuts langObj={langObj.shortcuts} />
            <div className="h-full w-full">
              <Powerups locale={locale} />
              <div
                id="rootDiv"
                className="relative flex h-full w-full animate-fade flex-row items-start justify-between gap-2 overflow-y-scroll px-2 pb-24 pt-2"
              >
                <div
                  style={{
                    scrollbarWidth: 'none',
                  }}
                  className="z-10 flex h-[90vh] flex-col gap-3 overflow-y-scroll lg:w-[12rem] xl:w-[15rem]"
                >
                  <Logs />
                  <PlayersSection />
                </div>
                <div className="z-10 flex grow flex-col items-center gap-2 rounded-lg">
                  <Canvases langObj={langObj.canvases} />
                </div>
                <div className="flex h-[90vh] max-w-[20rem] flex-col gap-2 lg:w-[12rem] xl:w-[15rem]">
                  <LeftNav />
                  <Chats langObj={langObj.chats} />
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

type Props = {
  roomID: string
  locale: Locale
}
