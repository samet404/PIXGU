'use client'

import dynamic from 'next/dynamic'
import { animated } from '@react-spring/web'
import { GeistSans } from 'geist/font/sans'
import { useState } from 'react'

const Spinner = dynamic(() => import('@/components/Spinner'))

export const Btn = () => {
  const [isLoading, setisLoading] = useState(false)

  const handleClick = () => setisLoading(true)

  return (
    <animated.button
      onMouseDown={handleClick}
      className={`${GeistSans.className} flex flex-row items-center gap-2 rounded-md border-[0.2rem] border-[#ffffffb0] !bg-rose-500 px-2 py-1 font-[500] text-[rgba(255,255,255,0.64)] shadow-[0_0px_20px_-3px_rgba(255,0,0,0.5)] outline-white`}
      type="submit"
    >
      <div>Log out</div>
      {isLoading && <Spinner className="size-4 drop-shadow-none" />}
    </animated.button>
  )
}
