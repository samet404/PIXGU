'use client'

import { useSpring, animated } from '@react-spring/web'
import { Outfit } from 'next/font/google'
import { useMutation } from '@tanstack/react-query'
import { logout } from './actions/logout'
import Spinner from '@/components/Spinner'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['600'],
})

export const LogoutBtn = ({ text }: Props) => {
  const { mutate, isLoading } = useMutation({
    mutationFn: logout,
  })

  const [springs, api] = useSpring(() => ({
    from: {
      opacity: 1,
    },
    config: {
      duration: 300,
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
    mutate()
    console.log(isLoading, 'isLoading')
  }

  return (
    <animated.button
      style={springs}
      onMouseDown={handleClick}
      className="flex flex-row items-center gap-2 rounded-md border-[0.2rem] border-[#ffffffb0] !bg-rose-500 px-2 py-1 font-[500] text-[rgba(255,255,255,0.64)] shadow-[0_0px_20px_-3px_rgba(255,0,0,0.5)] outline-white"
      type="submit"
    >
      <div className={outfit.className}>{text}</div>
      {isLoading && <Spinner className="size-4 drop-shadow-none" />}
    </animated.button>
  )
}

type Props = {
  text: string
}