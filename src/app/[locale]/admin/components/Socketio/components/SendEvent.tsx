'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { useSocketIO } from '@/zustand/store'

export const SendEvent = ({ event, className, danger }: Props) => {
    const io = useSocketIO(s => s.io)!

    const handleClick = () => {
        console.log('event sent: ', event)
        io.emit(event)
    }

    return (
        <button
            onMouseDown={!danger ? handleClick : undefined}
            onDoubleClick={danger ? handleClick : undefined}
            className={clsxMerge(`px-2 py-1 ${className}`, {
                'bg-yellow-400': !danger,
                'bg-red-400': danger,
            })}>
            {event}
        </button>
    )
}

type Props = {
    danger?: boolean
    event: string
    className?: string
}