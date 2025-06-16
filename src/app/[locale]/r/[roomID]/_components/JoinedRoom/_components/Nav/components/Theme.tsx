'use client'

import { useMatchStatusClient } from '@/zustand/store/useMatchStatusClient'

export const Theme = ({ themeText }: Props) => {
    const theme = useMatchStatusClient((s) => s.theme)

    if (theme) return (
        <div
            className='flex cursor-help relative  flex-row items-center gap-3 rounded-full bg-[rgba(255,255,255,0.20)] px-3 py-[0.35rem]   duration-[2000ms]'
        >
            <div className='w-full text-xs group/blur flex items-center justify-center text-[#ffffff93] h-full hover:opacity-0 duration-[5s] backdrop-blur-md absolute rounded-full left-0 top-0'>
                <div className='group/blur-hover:opacity-0'>{themeText}</div>
            </div>
            <div className="text-[0.9rem] leading-3 text-[#ffffff84]">
                {theme}
            </div>
        </div>)
}

type Props = {
    themeText: string
}
