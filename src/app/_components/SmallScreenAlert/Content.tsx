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
      className={`${outfit.className} z-50 flex h-full w-full flex-col items-center justify-center gap-5 bg-red-800`}
    >
      <div className="w-[90%] animate-fade text-center text-[1.2rem] text-white">
        Unfortunately we are currently not supporting mobile devices. Mobile support is currently under development and will be available soon.
      </div>
      <Timer />
    </div>
  )
}
