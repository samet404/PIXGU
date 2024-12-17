'use client'

import Image, { type StaticImageData } from 'next/image'
import { useSpring, animated } from '@react-spring/web'
import { sendToHostPeer } from '@/utils/sendToHostPeer'
import type { Powerup } from '@/types/powerups'
import { useMarketplacePrices, useMyCoin } from '@/zustand/store'
import { clsxMerge } from '@/utils/clsxMerge'
import { useState } from 'react'
import { useEffectOnce } from '@/hooks/useEffectOnce'

export const Button = ({ name }: Props) => {
  const coin = useMyCoin(s => s.coin)
  const [image, setImage] = useState<StaticImageData | null>(null)
  const price = useMarketplacePrices(s => s.value[name])!

  const [springs, api] = useSpring(() => ({
    from: {
      scale: 1,
    },
    config: {
      duration: 500,
    },
  }))

  const onClick = () => {
    if (coin < price) return
    sendToHostPeer({
      event: 'buyMarketItem',
      data: {
        name,
      },
    })

    api.start({
      from: {
        scale: 0.7,
      },
      to: {
        scale: 1,
      },
    })
  }


  useEffectOnce(() => {
    import(`@/png/power-ups/${name}.png`).then((i) => {
      setImage(i)
    })
  })

  return (
    <animated.button
      onMouseDown={onClick}
      style={springs}
      className={clsxMerge('group relative size-16 rounded-lg bg-[#ffffff70] p-2 shadow-[0_0px_10px_1px_rgba(0,0,0,0.2)] backdrop-blur-sm', {
        'opacity-50 cursor-not-allowed': coin < price
      })}
    >
      {image &&
        <Image
          src={image}
          alt={name}
          sizes="dsad"
          className="h-full w-full opacity-55 drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)]"
        />
      }
      <div className="absolute left-0 top-0 hidden h-full w-full animate-fade items-center justify-center rounded-lg bg-yellow-400  text-white group-hover:flex">
        {price}
      </div>
    </animated.button>
  )
}

type Props = {
  name: Powerup
}
