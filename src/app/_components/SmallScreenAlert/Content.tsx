'use client'

import { Outfit } from 'next/font/google'
import { Timer } from './Timer'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['700', '500'],
})

export const Content = () => {
  return (
    <div
      className={`${outfit.className} z-50 flex h-full w-full flex-col items-center justify-center gap-4 bg-black`}
    >
      <div className="w-[90%] animate-fade text-center text-[1.2rem] text-white">
        For the best experience, please access PIXGU on a desktop or laptop computer. Mobile support is currently under development. We appreciate your patience.
      </div>
      <Timer />
    </div>
  )
}
