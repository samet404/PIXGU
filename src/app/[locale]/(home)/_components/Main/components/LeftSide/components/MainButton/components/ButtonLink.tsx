'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import Link from 'next/link'
import { type MouseEvent, type PropsWithChildren, useState } from 'react'

const ButtonLink = ({ href, className, onMouseDown, children }: Props) => {
  const [isLoading, setisLoading] = useState(false)
  return (
    <Link
      href={href}
      className={clsxMerge(
        `none relative flex h-full w-full select-none flex-col justify-between gap-3 bg-gradient-to-tr from-[rgba(255,255,255,0.4)] to-[rgba(255,255,255,0.3)] p-2 shadow-[0_0px_5px_0px_rgba(0,0,0,0.8)] ${className}`,
        {
          'animate-pulse': isLoading == true,
        },
      )}
      onMouseDown={(e: MouseEvent) => {
        console.log(isLoading)
        setisLoading(true)
        if (onMouseDown)
          onMouseDown(e, {
            cancelLoading: () => setisLoading(false),
          })
      }}
    >
      {children}
    </Link>
  )
}

export default ButtonLink

type Props = PropsWithChildren<{
  href: string
  className?: string
  onMouseDown?: (
    e: MouseEvent,
    options: {
      cancelLoading: () => void
    },
  ) => void
}>
