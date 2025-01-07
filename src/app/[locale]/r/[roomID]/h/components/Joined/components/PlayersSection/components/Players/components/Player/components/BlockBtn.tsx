'use client'

import { Svg } from '@/components/Svg'
import { usePeers, useSocketIO } from '@/zustand/store'

export const BlockBtn = ({ userID }: Props) => {
    const io = useSocketIO(s => s.io)!

    const block = () => {
        usePeers.getState().removePeer(userID)
        io.emit('block-user', userID)
    }


    return (
        <button onMouseDown={block} className="size-10 items-center justify-center flex  rounded-full bg-[#ff6884] p-1 duration-300 hover:opacity-80">
            <Svg src='block-svgrepo-com.svg' alt="ban" className="h-full w-full opacity-50" />
        </button>
    )
}

type Props = {
    userID: string
}