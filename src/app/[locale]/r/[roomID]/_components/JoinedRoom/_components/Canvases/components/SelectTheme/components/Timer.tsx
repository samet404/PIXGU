'use client'

import { usePainterSelectingRemainTime } from '@/zustand/store'
import { type PropsWithChildren } from 'react'

export const Timer = ({ children }: PropsWithChildren) => {
  const height = usePainterSelectingRemainTime((s) => s.passedMilisecondsWithPercent)

  return (
    <div className="absolute z-40 flex h-full w-full items-center justify-center rounded-[0.4rem] bg-violet-300 p-2">
      <div
        style={{ height: `${height}%` }}
        className="absolute bottom-0 w-full animate-position rounded-[0.4rem]   bg-gradient-to-tr from-violet-500 to-violet-500"
      ></div>
      {children}
    </div>
  )
}
