import { useSpring, animated } from '@react-spring/web'
import type { MutableRefObject } from 'react'

export const RefetchBtn = ({ roomsRef }: Props) => {
  const [springs, api] = useSpring(() => ({
    from: {
      opacity: 1,
      scale: 1,
    },
    config: {
      duration: 300,
    },
  }))

  const handleClick = () => {
    api.start({
      from: {
        opacity: 0.6,
        scale: 0.8,
      },
      to: {
        opacity: 1,
        scale: 1,
      },
    })
    if (roomsRef.current?.refetch) roomsRef.current.refetch()
  }

  return (
    <animated.button
      style={springs}
      onMouseDown={handleClick}
      className="w-full items-center justify-center rounded-md bg-[#d953a5] px-2 py-1 font-[600] text-[#ffffffc2]"
    >
      Refresh
    </animated.button>
  )
}

type Props = {
  roomsRef: MutableRefObject<{
    refetch: () => void
  } | null>
}
