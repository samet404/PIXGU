import Spinner from '@/components/Spinner'
import { useSocketIO } from '@/zustand/store'
import { useState } from 'react'

export const KillRoomBtn = ({ roomID }: Props) => {
    const io = useSocketIO(s => s.io)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        <button
            onMouseDown={async () => {
                setIsLoading(true)
                io!.emit('kill', roomID)
            }}
            className="rounded-md bg-[#ff0342a2] flex flex-row items-center gap-2 px-2 py-1 font-[900] text-[#00000074] duration-300 hover:opacity-70"
        >
            <div>Kill room</div> {isLoading && <Spinner className='size-5' />}
        </button>)
}

type Props = {
    roomID: string
}