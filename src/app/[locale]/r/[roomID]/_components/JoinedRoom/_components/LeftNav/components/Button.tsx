'use client'

import { useShortcut } from '@/hooks/useShortcut'
import type { ControlsState } from '@/zustand/store'
import { useSpring, animated } from '@react-spring/web'
import { type ReactNode } from 'react'

// @ts-nocheck
export const Button = ({ className, onMouseDown, icon, shortcutName }: Props) => {
  // const clickSfxRef = useRef<HTMLAudioElement>(
  //   new Audio('/sound/sfx/button/crystal_panel_button.mp3'),
  // )
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
    <animated.button
      style={springs}
      onMouseDown={handleClick}
      className={`flex size-9 flex-row items-center gap-2 rounded-lg bg-[#ffffff2f] to-transparent p-1 ${className}`}
    >
      {icon}
    </animated.button>
  )
}

type Props = {
  className?: string
  shortcutName: keyof ControlsState['keys']
  onMouseDown?: () => void
  icon: ReactNode
}
