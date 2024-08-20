'use client'

import { useSpring, animated } from '@react-spring/web'

export const Button = ({ text, onClick }: Props) => {
  const [springs, api] = useSpring(() => ({
    from: {
      scale: 1,
    },
    config: {
      duration: 400,
    },
  }))

  const handleClick = () => {
    api.start({
      from: {
        scale: 0.9,
      },
      to: {
        scale: 1,
      },
    })

    onClick?.()
  }

  return (
    <animated.button
      style={springs}
      onClick={handleClick}
      className="rounded-lg border-[0.18rem] border-[#ffffff3f] bg-[#ffffff35] from-[#24cb9c] to-[#0072b3] px-2 py-1 text-[1.1rem] text-[#ffffff76] hover:bg-gradient-to-tr hover:text-[#ffffffc0]"
    >
      {text}
    </animated.button>
  )
}

type Props = {
  text: string
  onClick?: () => void
}
