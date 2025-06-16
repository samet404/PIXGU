'use client'

import { useShortcut } from '@/hooks/useShortcut'
import { useControls, type ControlsState } from '@/zustand/store/useControls'
import { useSpring, animated } from '@react-spring/web'
import { type ReactNode } from 'react'

// @ts-nocheck
export const Button = ({ className, onMouseDown, icon, shortcutName }: Props) => {
  const binding = useControls(s => s.keys[shortcutName])
  const [springs, api] = useSpring(() => ({
    from: {
      scale: 1,
    },
    config: {
      duration: 400,
    },
  }))


  const clickAnimation = () =>
    api.start({
      from: {
        scale: 0.9,
      },
      to: {
        scale: 1,
      },
    })


  const handleClick = () => {
    // clickSfxRef.current.play()
    clickAnimation()
    onMouseDown?.()
  }

  useShortcut({
    keyName: shortcutName,
    onShortcut: handleClick
  })


  return (
    <div className='relative group size-9'>
      <animated.button
        style={springs}
        onMouseDown={handleClick}
        className={`flex w-full h-full flex-row group items-center gap-2 rounded-lg bg-[#ffffff2f] to-transparent p-1 ${className}`}
      >
        {icon}
      </animated.button>

      <div className='absolute group-hover:flex font-[700] hidden px-2 w-[20rem] text-[0.5rem] leading-4 break-keep top-[35] text-white left-0'>
        {binding.join(' + ')}
      </div>
    </div>
  )
}

type Props = {
  className?: string
  shortcutName: keyof ControlsState['keys']
  onMouseDown?: () => void
  icon: ReactNode
}
