'use client'

import { useSpring, animated } from '@react-spring/web'
import { useEventListener } from 'usehooks-ts'
import { useRef } from 'react'

export const Button = ({
  text,
  keyName,
  onKeyDown,
  className,
  onClick,
}: Props) => {
  const documentRef = useRef(document)
  const [springs, api] = useSpring(() => ({
    from: {
      opacity: 1,
    },
    config: {
      duration: 400,
    },
  }))

  const clickAnimation = () =>
    api.start({
      from: {
        opacity: 0.6,
      },
      to: {
        opacity: 1,
      },
    })

  useEventListener('keydown', (e) => onKeyDown(e), documentRef)

  const handleClick = () => {
    clickAnimation()
    onClick?.()
  }

  return (
    <animated.button
      style={springs}
      onClick={handleClick}
      className={`flex flex-row items-center gap-2 rounded-lg bg-gradient-to-r from-[#ffffff35] to-transparent p-1  pr-28 text-[#ffffff76] hover:text-[#ffffffc0] ${className}`}
    >
      <div className="w-[3rem] rounded-md bg-[#ffffff29] text-[1rem]">
        {keyName}
      </div>
      <div className="text-[1.1rem]">{text}</div>
    </animated.button>
  )
}

type Props = {
  text: string
  keyName: string
  onKeyDown: (e: KeyboardEvent) => void
  className?: string
  onClick?: () => void
}
