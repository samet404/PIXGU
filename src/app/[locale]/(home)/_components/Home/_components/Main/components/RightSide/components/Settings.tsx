'use client'

import Link from 'next/link'
import { useSpring, animated } from '@react-spring/web'
import { Cog, SettingsIcon } from 'lucide-react'

const Settings = () => {
  const [springs, api] = useSpring(() => ({
    from: {
      opacity: 1,
    },
    config: {
      duration: 200,
    },
  }))

  const handleClick = () => {
    api.start({
      from: {
        opacity: 0.5,
      },
      to: {
        opacity: 1,
      },
    })
  }

  return (
    <animated.button
      style={springs}
      className="flex items-center justify-center rounded-full"
      onMouseDown={handleClick}
    >
      <Link href={'/settings/account'} className="">
        <Cog className="hover:animate-rotate text-3xl text-[#ffffffcf] drop-shadow-[0_0px_3px_rgba(0,0,0,0.45)] duration-300 hover:animate-spin hover:animate-duration-[4000ms] hover:animate-infinite size-9" />
      </Link>
    </animated.button>
  )
}

export default Settings
