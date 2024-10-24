'use client'

import { useSetAtom } from 'jotai'
import { Outfit } from 'next/font/google'
import { isClosedAtom } from './atoms'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['700', '500'],
})

export const Content = () => {
  const setClosed = useSetAtom(isClosedAtom)
  return (
    <div
      className={`${outfit.className} z-50 flex h-full w-full flex-col items-center justify-center gap-4 bg-black`}
    >
      <div className="w-[90%] animate-fade text-center text-[1.2rem] text-white">
        PIXGU is designed for larger desktop screens. Are you sure you want to
        continue?
      </div>
      <div className="flex flex-row gap-3">
        <button
          onMouseDown={() => setClosed(true)}
          className="animate-fade rounded-md bg-white px-2 py-1 text-black"
        >
          Yes
        </button>
        <button
          onMouseDown={() => {
            localStorage.setItem('small-screen-alert', 'false')
            setClosed(true)
          }}
          className="animate-fade rounded-md bg-white px-2 py-1 text-black"
        >
          Don't show again
        </button>
      </div>
    </div>
  )
}
