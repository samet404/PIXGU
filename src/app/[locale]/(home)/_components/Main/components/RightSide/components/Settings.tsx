'use client'

import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useSpring, animated } from '@react-spring/web'

const Settings = () => {
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
        scale: 0.8,
      },
      to: {
        opacity: 1,
        scale: 1,
      },
    })
  }

  return (
    <animated.button
      style={springs}
      className="flex h-10 w-10 items-center justify-center rounded-full"
      onMouseDown={handleClick}
    >
      <Link href={'/settings/account'} className="">
        <FontAwesomeIcon
          icon={faGear}
          className="hover:animate-rotate text-3xl text-white drop-shadow-[0_0px_3px_rgba(0,0,0,0.45)] duration-300 hover:animate-spin hover:animate-duration-[4000ms] hover:animate-infinite"
        />
      </Link>
    </animated.button>
  )
}

export default Settings
