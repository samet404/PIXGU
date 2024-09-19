'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { type MouseEvent, type PropsWithChildren, useState } from 'react'

const Button = ({ onMouseDown, className, children }: Props) => {
  const [isLoading, setisLoading] = useState(false)
  return (
    <button
      className={clsxMerge(
        `none relative flex h-full w-full flex-col justify-between gap-3 bg-gradient-to-tr from-[rgba(255,255,255,0.4)] to-[rgba(255,255,255,0.3)] p-2 shadow-[0_0px_5px_0px_rgba(0,0,0,0.8)] ${className}`,
        {
          'animate-pulse': isLoading == true,
        },
      )}
      onMouseDown={(e: MouseEvent) => {
        setisLoading(true)
        if (onMouseDown)
          onMouseDown(e, {
            cancelLoading: () => setisLoading(false),
          })
      }}
    >
      {children}
    </button>
  )
}

export default Button

type Props = PropsWithChildren<{
  onMouseDown?: (
    e: MouseEvent,
    options: {
      cancelLoading: () => void
    },
  ) => void
  className?: string
}>
