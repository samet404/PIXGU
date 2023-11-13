"use client"

import { Outfit } from 'next/font/google'
import { useRouter } from 'next/navigation'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['900']
})

type BottomButtonProps = {
  text: string
  className?: string
  type: 'exit' | 'createRoom'
}

const BottomButton = ({ text, className, type }: BottomButtonProps) => {
  const router = useRouter()

  let buttonStyle
  if (type === 'exit') buttonStyle = 'bg-gradient-to-tr from-black to-gray-600'
  if (type === 'createRoom') buttonStyle = 'bg-gradient-to-tr from-orange-500 to-yellow-400'

  const handleOnClick = () => {
    if (type === 'exit') router.back()
    if (type === 'createRoom') router.push('room/dasşdjsaodp')
  }

  return (
    <button
      onClick={handleOnClick}
      className={`${className} ${buttonStyle} ${outfit.className} select-none text-[rgba(255,255,255,0.8)] rounded-md px-3 py-1 text-[1.2rem]`}
    >
      {text}
    </button>
  )
}

export default BottomButton
