'use client'

import { useRouter } from 'next/navigation'
import type { PropsWithChildren } from 'react'

const HomeBtn = ({ children }: PropsWithChildren) => {
  const router = useRouter()
  const handleClick = () => router.push('/')

  return (
    <button
      className="cursor-pointer rounded-lg p-2 text-[#ffffff9c]"
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default HomeBtn
