'use client'

import type { PropsWithChildren } from 'react'
import { clsxMerge } from '@/utils/clsxMerge'
import { useIsGamePaused } from '@/zustand/store/useIsGamePaused'

export const Blur = ({ children }: PropsWithChildren) => {
  const isPaused = useIsGamePaused((state) => state.isPaused)

  return (
    <div
      className={clsxMerge(
        ' z-40 flex h-full w-full animate-fade items-center justify-center blur-lg duration-1000',
        {
          'blur-none': !isPaused,
        },
      )}
    >
      {children}
    </div>
  )
}
