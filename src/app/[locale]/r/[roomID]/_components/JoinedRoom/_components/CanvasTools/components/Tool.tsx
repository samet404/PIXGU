'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { useSpring, animated } from '@react-spring/web'
import type {
  ComponentProps,
  MouseEvent,
  PropsWithChildren,
  ReactNode,
} from 'react'

export const Tool = ({
  icon,
  className,
  isActive,
  children,
  onMouseDown,
  ...rest
}: Props) => {
  const [springs, api] = useSpring(() => ({
    from: {
      scale: 1,
      rotate: '0deg',
    },
    config: {
      tension: 300,
      friction: 10,
    },
  }))

  return (
    <animated.button
      onMouseDown={(e: MouseEvent<HTMLButtonElement>) => {
        if (!onMouseDown) return
        api.start({
          from: {
            scale: 0.8,
            rotate: '-20deg',
          },
          to: {
            scale: 1,
            rotate: '0deg',
          },
        })
        onMouseDown(e)
      }}
      onMouseEnter={() => {
        if (isActive) return

        api.start({
          scale: 1.1,
        })
      }}
      onMouseLeave={() => {
        if (isActive) return

        api.start({
          scale: 1,
        })
      }}
      style={springs}
      className={clsxMerge(
        `group flex h-full w-full items-center justify-center gap-2 rounded-md p-1 duration-300 ${className} `,
        {
          'drop-shadow-[0_0px_10px_rgba(255,255,255,0.8)]': isActive,
        },
      )}
      {...rest}
    >
      {icon}
      {children}
    </animated.button>
  )
}

type Props = PropsWithChildren<{
  onMouseDown?: (e: MouseEvent<HTMLButtonElement>) => void
  className?: string
  icon: ReactNode
  isActive?: boolean
}> &
  ComponentProps<typeof animated.button>
