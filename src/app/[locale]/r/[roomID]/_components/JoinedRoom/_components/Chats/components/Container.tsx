'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { useWhoIsPainterClient } from '@/zustand/store'
import { Urbanist } from 'next/font/google'
import type { PropsWithChildren } from 'react'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['700'],
})

export const Container = ({ children }: PropsWithChildren) => {
  const whoIsPainter = useWhoIsPainterClient((s) => s.value)

  return (
    <div
      className={'h-[95%] overflow-y-auto flex flex-col gap-2'}
    >
      {children}
    </div>
  )
}
