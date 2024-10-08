'use client'

import { useRouter } from 'next/navigation'

const HomeBtn = () => {
  const router = useRouter()

  const handleClick = () => router.push('/')

  return (
    <div
      className="cursor-pointer rounded-lg bg-[#ffffff24] p-2 text-[#ffffff9c]"
      onClick={handleClick}
    >
      Go to Home
    </div>
  )
}

export default HomeBtn
