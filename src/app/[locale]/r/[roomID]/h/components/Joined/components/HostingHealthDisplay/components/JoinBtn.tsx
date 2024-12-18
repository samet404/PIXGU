import { useSpring, animated } from '@react-spring/web'
import Link from 'next/link'

export const JoinBtn = () => {
  const [springs, api] = useSpring(() => ({
    from: {
      scale: 1,
      opacity: 1,
    },
    config: {
      duration: 400,
    },
  }))

  const handleClick = () => {
    api.start({
      from: {
        scale: 0.9,
        opacity: 0.7,
      },
      to: {
        scale: 1,
        opacity: 1,
      },
    })
  }

  return (
    <animated.button onClick={handleClick} style={springs} className="flex">
      <Link
        href={window.location.href.replace(/\/h$/, '')}
        target="_blank"
        prefetch={false}
        className="flex h-full w-full items-center flex-shrink justify-center rounded-md bg-[#ffffff82] px-4 py-1  text-[#02020285] hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-65"
      >
        Join the game
      </Link>
    </animated.button>
  )
}
