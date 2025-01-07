'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { useTabs } from '@/zustand/store'

export const StayhereBtn = () => {
    const isMusicPlayerStays = useTabs((s) => s.musicPlayerStayOpen)
    const setMusicPlayerStayOpen = useTabs(s => s.setMusicPlayerStayOpen)

    return (
        <button onMouseDown={() => setMusicPlayerStayOpen(!isMusicPlayerStays)} className={clsxMerge('hover:bg-[#ffffff24] py-1 rounded-b-md duration-200', {
            'bg-[#f6572796] hover:bg-[#f65727bf] ': isMusicPlayerStays
        })}>
            Stay on this tab
        </button>
    )
}