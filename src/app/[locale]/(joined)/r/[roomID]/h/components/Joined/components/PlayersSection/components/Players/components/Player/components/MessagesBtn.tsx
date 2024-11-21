"use client"

import { useSetAtom } from 'jotai'
import { switchMessagesAtom } from '../atoms'
import { Svg } from '@/components/Svg'

export const MessagesBtn = ({ userID }: Props) => {
    const switchMessages = useSetAtom(switchMessagesAtom)

    return (
        <button onMouseDown={() => switchMessages(userID)} className="size-10 flex items-center justify-center rounded-full bg-[#7f7f7f96] p-[0.30rem] duration-300 hover:opacity-80">
            <Svg
                src='message-2-svgrepo-com.svg'
                alt="messages"
                className="size-8 opacity-65"
            />
        </button>
    )
}

type Props = {
    userID: string
}