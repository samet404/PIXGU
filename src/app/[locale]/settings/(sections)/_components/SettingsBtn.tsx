'use client'

import { type ComponentProps, type MouseEvent } from 'react'
import Spinner from '@/components/Spinner'
import { clsxMerge } from '@/utils/clsxMerge'
import { useSpring, animated } from '@react-spring/web'

export const SettingsBtn = ({
  name,
  description,
  className,
  isLoading,
  onMouseDown,
  ...rest
}: Props) => {
  const [springs, api] = useSpring(() => ({
    from: {
      scale: 1,
    },
    config: {
      duration: 300,
    },
  }))

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    api.start({
      from: {
        scale: 0.8,
      },
      to: {
        scale: 1,
      },
    })
    onMouseDown?.(e)
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex flex-row items-center gap-2">
        <animated.button
          {...rest}
          onMouseDown={handleClick}
          style={springs}
          disabled={isLoading}
          className={clsxMerge(`rounded-md px-2 py-1 ${className}`)}
        >
          {name}
        </animated.button>
        {isLoading && <Spinner className="size-8" />}
      </div>

      <div className="rounded-md bg-[#ffffff5e] p-2 text-sm text-[#0000009b]">
        {description}
      </div>
    </div>
  )
}

type Props = {
  name: string
  isLoading?: boolean
  className?: string
  description: string
} & ComponentProps<typeof animated.button>
