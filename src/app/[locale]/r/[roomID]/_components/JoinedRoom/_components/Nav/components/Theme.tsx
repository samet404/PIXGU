"use client"

import { useMatchStatusClient } from '@/zustand/store'

export const Theme = () => {
    const theme = useMatchStatusClient((s) => s.theme)

    if (theme) return (
        <div
            className='flex blur-sm cursor-help relative hover:blur-none flex-row items-center gap-3 rounded-full bg-[rgba(255,255,255,0.20)] px-3 py-[0.35rem]   duration-[2000ms]'
        >
            <div className="text-[0.9rem] leading-3 text-[#ffffff84]">
                {theme}
            </div>
        </div>)
}