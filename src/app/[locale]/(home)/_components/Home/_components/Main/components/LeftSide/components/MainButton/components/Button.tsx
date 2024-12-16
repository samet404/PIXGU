'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { type ComponentProps, type MouseEvent, type PropsWithChildren, useRef, useState } from 'react'

const Button = ({ onMouseDown, className, children, ...rest }: Props) => {
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const [isLoading, setisLoading] = useState(false)
  return (
    <button
      ref={btnRef}
      className={clsxMerge(
        `none relative flex h-full w-full flex-col justify-between gap-3 bg-gradient-to-tr from-[rgba(255,255,255,0.4)] to-[rgba(255,255,255,0.3)] p-2 shadow-[0_0px_5px_0px_rgba(0,0,0,0.8)] ${className}`,
        {
          'animate-pulse': isLoading == true,
        },
      )}
      onMouseDown={(e: MouseEvent) => {
        if (!btnRef.current?.disabled) setisLoading(true)
        if (onMouseDown)
          onMouseDown(e, {
            cancelLoading: () => setisLoading(false),
          })
      }}
      {...rest}
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
}> & ComponentProps<'button'>
