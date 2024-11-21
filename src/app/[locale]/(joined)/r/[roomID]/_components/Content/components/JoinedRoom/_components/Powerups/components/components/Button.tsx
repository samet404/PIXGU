import { useState, type ComponentProps } from 'react'
import type { OverrideProps, Powerup } from '@/types'
import { clsxMerge } from '@/utils/clsxMerge'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useSpring, animated } from '@react-spring/web'
import Image, { type StaticImageData } from 'next/image'
import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { useOwnedPowerups } from '@/zustand/store'

export const Button = ({ name, isDisabled, onClick, ...rest }: Props) => {
  const [image, setImage] = useState<StaticImageData | null>(null)
  const count = useOwnedPowerups((s) => s.powerups[name])

  const [springs, api] = useSpring(() => ({
    from: {
      scale: 1,
    },
    config: {
      tension: 300,
      friction: 10,
    },
  }))

  const handleOnClick = () => {
    if (count === 0) return

    api.start({
      from: {
        scale: 1,
      },
      to: [
        {
          scale: 0.8,
        },
        {
          scale: 1,
        },
      ],
    })

    sendToHostPeer({
      event: 'usePowerup',
      data: {
        name: name
      }
    })

    onClick?.()
  }


  useEffectOnce(() => {
    import(`@/png/power-ups/${name}.png`)
      .then((i) => {
        setImage(i)
      })
  })

  return (
    <animated.button
      {...rest}
      onMouseDown={handleOnClick}
      style={springs}
      disabled={isDisabled}
      className={clsxMerge('z-90 group relative size-16 rounded-lg bg-[#ffe600] p-2  backdrop-blur-sm', {
        'opacity-50 cursor-not-allowed': isDisabled,
      })}
    >
      {image && <Image
        src={image}
        alt={name}
        sizes="dsad"
        className="pointer-events-none h-full w-full opacity-75 drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)]"
      />}

      <div className="absolute left-1 top-0 flex font-[700]  animate-fade items-center justify-center rounded-lg bg-[#ffe600]  text-white ">
        <div className='drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)]'>
          {count}

        </div>
      </div>
    </animated.button>
  )
}

type Props = OverrideProps<ComponentProps<typeof animated.button>,
  {
    onClick?: () => void
    name: Powerup
    isDisabled: boolean
  }> 
