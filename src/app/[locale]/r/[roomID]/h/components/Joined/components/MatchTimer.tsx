'use client'

import { useMatchStatus } from '@/zustand/store'

export const MatchTimer = () => {
    const remainSeconds = useMatchStatus(s => s.value.remainSeconds)

    if (remainSeconds)
        return <div className='absolute w-full flex items-center justify-center gap-1 p-5 top-0 left-0 '>
            <div className='flex flex-row gap-1 px-3 py-1 text-[#ffffffa2] bg-[#ffffff1b] rounded-full text-sm'>
                <div>
                    {Math.floor(remainSeconds / 60)}m
                </div>
                <div>
                    {remainSeconds % 60}s
                </div>
            </div>
        </div>
}