'use client'

import { useSpring, animated } from '@react-spring/web'

export const RefreshBtn = ({ refetch }: Props) => {
  const [springs, api] = useSpring(() => ({
    from: {
      opacity: 1,
      scale: 1,
    },
    config: {
      duration: 200,
    },
  }))

  const handleClick = () => {
    api.start({
      from: {
        opacity: 0,
        scale: 0.7,
      },
      to: {
        opacity: 1,
        scale: 1,
      },
    })
    refetch()
  }

  return (
    <animated.button
      style={springs}
      onMouseDown={handleClick}
      className="rounded-md bg-[#03ff92a0] px-2 py-1 font-[900] text-[#00000074] duration-300 hover:opacity-70"
    >
      Refresh
    </animated.button>
  )
}

type Props = {
  refetch: () => void
}
