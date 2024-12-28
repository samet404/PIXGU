import './_styles/scrollbars.css'
import { Providers } from './_components/Providers'
import AnimatedDiv from './_components/AnimatedDiv'
import { Status } from './_components/Status'
import Canvases from './_components/Canvases'
import { Chats } from './_components/Chats'
import Nav from './_components/Nav'
import PlayersSection from './_components/PlayersSection'
import { LeftNav } from './_components/LeftNav'
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
import { Logs } from './_components/Logs'
import { TipsModal } from './_components/TipsModal'
import type { Locale } from '@/types/locale'
import { redisDb } from '@/db/redis'
import { notFound } from 'next/navigation'
import { PainterToolGuide } from './_components/PainterToolGuide'

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['700', '600', '500', '400', '800', '300', '200', '900', '100'],
})

const JoinedRoom = async ({
    roomID,
    locale
}: Props) => {
    const havePassword = await api.gameRoom.isHavePass.query({
        roomID,
    })

    const user = await api.auth.getUser.query()
    const isLogged = await api.auth.isLogged.query()
    const hostID = await redisDb.get(`room:${roomID}:host_ID`)
    if (!hostID) notFound()
    const guest = await api.auth.getGuest.query()

    return (
        <div
            className={`${outfit.className} relative flex h-full w-full flex-col`}
        >
            <Providers
                havePassword={havePassword}
                userID={isLogged ? user!.id : guest!.ID}
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
                        <PainterToolGuide />
                        <CanvasToolsShadow />
                        <ToolAlert />
                        <ResetStates />
                        <CanvasTools />
                        <GameEnd userID={user ? user.id : guest!.ID} />
                        <Status />
                        <Shortcuts />
                        <div className="h-full w-full">
                            <LetterHint />
                            <Powerups locale={locale} />
                            <TipsModal />


                            <div
                                id="rootDiv"
                                className="relative flex h-full w-full animate-fade flex-row items-start justify-between gap-2 overflow-y-scroll px-2 pb-24 pt-2"
                            >
                                <Spectator />

                                <div
                                    style={{
                                        scrollbarWidth: 'none'
                                    }}
                                    className="z-10 flex h-[90vh] overflow-y-scroll flex-col gap-3 lg:w-[12rem] xl:w-[15rem]">
                                    <Logs />
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


type Props = {
    roomID: string
    locale: Locale
}