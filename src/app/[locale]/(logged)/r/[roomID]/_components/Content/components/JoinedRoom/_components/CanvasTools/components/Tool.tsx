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
    },
  }))

  return (
    <animated.button
      onMouseDown={(e: MouseEvent<HTMLButtonElement>) => {
        if (!onMouseDown) return
        api.start({
          from: {
            scale: 0.5,
          },
          to: {
            scale: 1,
          },
        })
        onMouseDown(e)
      }}
      style={springs}
      className={clsxMerge(
        `group flex h-full w-full items-center justify-center gap-2 rounded-md bg-[rgba(255,255,255,0.2)] p-1 duration-300 ${className} `,
        {
          'bg-[rgba(255,255,255,0.4)]': isActive,
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
