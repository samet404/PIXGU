'use client'

import Spinner from '@/components/Spinner'
import { api } from '@/trpc/react'
import { KillRoomBtn } from './components/KillRoomBtn'
import { GoToRoom } from './components/GoToRoom'
import type { LangObj } from '@/app/[locale]/create/lang'

export const Room = ({ ID, lang }: Props) => {
    console.log('lang', lang)
    const { data, error, isLoading } =
        api.gameRoom.getCreatedRoom.useQuery(
            { ID },
            {
                refetchOnWindowFocus: false,
            },
        )

    if (isLoading || !data) return <Spinner />
    if (error) return <div>{error.message}</div>

    const { createdAt, password, name, playerCount, version } = data

    return (
        <div className="flex animate-fade flex-col gap-2 rounded-lg bg-gradient-to-tr from-[#ffffff40] via-[#ffffff17] to-[#ffffff40] p-2  backdrop-blur-md">
            <div className='flex flex-row flex-wrap gap-2'>
                <div className="rounded-md bg-[#ffffff52] px-2 py-1 text-white">
                    ID: {ID}
                </div>
                <div className="rounded-md bg-[#ffffff52] px-2 py-1 text-white">
                    {lang.name}: {name}
                </div>

                <div className="rounded-md bg-[#ffffff52] px-2 py-1 text-white">
                    {password ? `${lang.password}: ${password}` : 'Public'}
                </div>
                <div className="rounded-md bg-[#ffffff52] px-2 py-1 text-white">
                    {lang.date}: {createdAt.toString()}
                </div>

                <div className="rounded-md bg-[#ffffff52] px-2 py-1 text-white">
                    {lang.playerCount}: {playerCount}/10
                </div>
                <div className="rounded-md bg-[#ffffff52] px-2 py-1 text-white">
                    {lang.version}: {version}
                </div>
            </div>
            <div className='drop-shadow-[0_0px_6px_rgba(0,0,0,0.55)] flex flex-row items-start gap-2'>
                <GoToRoom displayText={lang.goToRoomBtnText} ID={ID} />
                <KillRoomBtn displayText={lang.killRoomBtnText} roomID={ID} />
            </div>
        </div>
    )
}

type Props = {
    ID: string
    refetch: () => void
    lang: LangObj['roomsData']
}
