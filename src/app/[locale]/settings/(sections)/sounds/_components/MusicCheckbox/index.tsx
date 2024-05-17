'use client'

import Checkbox from '@/components/Checkbox'
import { musicAtom } from '@/app/_atoms/atomsWithStorage'
import { Inter } from 'next/font/google'

const inter = Inter({
  weight: ['500'],
  subsets: ['latin'],
})

const MusicCheckbox = () => {
  return (
    <div className="flex flex-row items-center gap-4 rounded-lg bg-gradient-to-tr from-[#00000016] to-[#00000006] p-2 shadow-[0_0px_15px_1px_rgba(255,255,255,0.3)]">
      <div
        className={`${inter.className} rounded-lg bg-gradient-to-tr from-[#ffffff3e] to-[#ffffff2e] px-2 py-1 text-[1.1rem] text-white shadow-[0_0px_10px_1px_rgba(0,0,0,0.1)] selection:!bg-[#90ee90]`}
      >
        Music
      </div>
      <Checkbox atom={musicAtom} />
    </div>
  )
}
export default MusicCheckbox
