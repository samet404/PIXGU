'use client'

import { useSpring, animated } from '@react-spring/web'
import { useRef, type ReactNode } from 'react'

// @ts-nocheck
export const Button = ({ className, onMouseDown, icon }: Props) => {
  const clickSfxRef = useRef<HTMLAudioElement>(
    new Audio('/sound/sfx/button/crystal_panel_button.mp3'),
  )
  const documentRef = useRef(document)
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
    clickSfxRef.current.play()
    clickAnimation()
    onMouseDown?.()
  }

  return (
    <animated.button
      style={springs}
      onMouseDown={handleClick}
      className={`flex size-9 flex-row items-center gap-2 rounded-lg bg-[#ffffff35] to-transparent p-1 ${className}`}
    >
      {icon}
    </animated.button>
  )
}

type Props = {
  className?: string
  onMouseDown?: () => void
  icon: ReactNode
}
