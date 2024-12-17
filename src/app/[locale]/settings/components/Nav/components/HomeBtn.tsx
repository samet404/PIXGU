'use client'

import { useRouter } from 'next/navigation'

const HomeBtn = () => {
  const router = useRouter()

  const handleClick = () => router.push('/')

  return (
    <div
      className="cursor-pointer rounded-lg p-2 text-[#ffffff9c]"
      onClick={handleClick}
    >
      {`Home`}
    </div>
  )
}

export default HomeBtn
