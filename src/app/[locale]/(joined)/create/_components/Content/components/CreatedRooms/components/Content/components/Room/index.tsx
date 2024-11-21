'use client'

import Spinner from '@/components/Spinner'
import { api } from '@/trpc/react'
import Link from 'next/link'
import { KillRoomBtn } from './components/KillRoomBtn'
import { GoToRoom } from './components/GoToRoom'

export const Room = ({ ID, refetch }: Props) => {
    const { data, error, isError, isLoading } =
        api.gameRoom.getCreatedRoom.useQuery(
            { ID },
            {
                refetchOnWindowFocus: false,
            },
        )

    if (isLoading || !data) return <Spinner />
    if (error) return <div>{error.message}</div>

    const { createdAt, password, name, playerCount } = data

    return (
        <div className="flex animate-fade flex-col gap-2 rounded-lg bg-gradient-to-tr from-[#ffffff40] via-[#ffffff17] to-[#ffffff40] p-2  backdrop-blur-md">
            <div className='flex flex-row flex-wrap gap-2'>
                <div className="rounded-md bg-[#ffffff52] px-2 py-1 text-white">
                    ID: {ID}
                </div>
                <div className="rounded-md bg-[#ffffff52] px-2 py-1 text-white">
                    Name: {name}
                </div>

                <div className="rounded-md bg-[#ffffff52] px-2 py-1 text-white">
                    {password ? `Password: ${password}` : 'Public'}
                </div>
                <div className="rounded-md bg-[#ffffff52] px-2 py-1 text-white">
                    Date: {createdAt.toString()}
                </div>

                <div className="rounded-md bg-[#ffffff52] px-2 py-1 text-white">
                    Players: {playerCount}/10
                </div>
            </div>
            <div className='drop-shadow-[0_0px_6px_rgba(0,0,0,0.55)] flex flex-row items-start gap-2'>
                <GoToRoom ID={ID} />
                <KillRoomBtn roomID={ID} />
            </div>
        </div>
    )
}

type Props = {
    ID: string
    refetch: () => void
}
