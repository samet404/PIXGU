import type { GameLog } from '@/types'
import clsx from 'clsx'

export const Item = ({ rtcData }: Props) => {
    const { color, data, time } = rtcData

    return (
        <div className={clsx('flex flex-col gap-1 text-xs bg-[#00000018] p-1', {
            'text-emerald-400': color === 'green',
            'text-red-400': color === 'red',
            'text-yellow-400': color === 'yellow',
        })}>
            <div>
                {data}
            </div>
            <div>
                {new Date(time).toLocaleTimeString()}
            </div>
        </div>
    )
}

type Props = {
    rtcData: GameLog['data']
}