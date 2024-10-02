'use client'

import Image, { type StaticImageData } from 'next/image'
import { useSpring, animated } from '@react-spring/web'
import { sendToHostPeer } from '@/utils/sendToHostPeer'
import type { Powerup } from '@/types/powerups'

export const Button = ({ name, price }: Props) => {
  const [springs, api] = useSpring(() => ({
    from: {
      scale: 1,
    },
    config: {
      duration: 500,
    },
  }))

  const onClick = () => {
    api.start({
      from: {
        scale: 0.7,
      },
      to: {
        scale: 1,
      },
    })
    sendToHostPeer({
      from: 'client',
      event: 'marketItem',
      data: {
        name,
      },
    })
  }
  return (
    <animated.button
      onMouseDown={onClick}
      style={springs}
      className="group relative size-16 rounded-lg bg-[#ffffff70] p-2 shadow-[0_0px_10px_1px_rgba(0,0,0,0.2)] backdrop-blur-sm"
    >
      {import(`@/png/power-ups/${name}.png`).then((i) => (
        <Image
          src={i}
          alt={name}
          sizes="dsad"
          className="h-full w-full opacity-55 drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)]"
        />
      ))}
      <div className="absolute left-0 top-0 hidden h-full w-full animate-fade items-center justify-center rounded-lg bg-yellow-400  text-white group-hover:flex">
        {price}
      </div>
    </animated.button>
  )
}

type Props = {
  name: Powerup
  price: number
}
