import Spinner from '@/components/Spinner'

import Link from 'next/link'
import { useState } from 'react'

export const GoToRoom = ({ ID }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        <Link
            onMouseDown={() => setIsLoading(true)}
            className="rounded-md bg-[#03ff92a0] flex flex-row items-center gap-2 px-2 py-1 font-[900] text-[#00000074] duration-300 hover:opacity-70"
            href={`/r/${ID}/h`}
        >
            <div>Go to room</div> {isLoading && <Spinner className='size-5' />}
        </Link>
    )
}

type Props = {
    ID: string
}