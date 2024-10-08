'use client'

import Image from 'next/image'
import { useSpring, animated } from '@react-spring/web'
import { sendToHostPeer } from '@/utils/sendToHostPeer'
import type { MarketItem } from '@/types/webRTCConnData'
import { usePowerups } from '@/zustand/store'

export const Button = ({ name, count }: Props) => {
  const price = usePowerups((s) => s.prices[name])
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
  }
  return (
    <animated.button
      onMouseDown={onClick}
      style={springs}
      className="z-90 group relative size-16 rounded-lg bg-[#ffe600] p-2  backdrop-blur-sm"
    >
      {import(`@/png/power-ups/${name}.png`).then((i) => (
        <Image
          src={i}
          alt={name}
          sizes="dsad"
          className="pointer-events-none h-full w-full opacity-75 drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)]"
        />
      ))}
      <div className="bg-yellow-200-400 absolute left-0 top-0 hidden h-full w-full animate-fade items-center justify-center rounded-lg bg-[#ffe600]  text-white group-hover:flex">
        {count}
      </div>
    </animated.button>
  )
}

type Props = {
  count: number
  name: MarketItem['data']['name']
}
