'use client'

import { Inter } from 'next/font/google'
const inter400 = Inter({
  subsets: ['latin'],
  weight: ['400'],
})

const SkipButton = () => {
  return (
    <button
      className={`${inter400.className} rounded-md bg-[#ff7688] px-3 py-2`}
    >
      Skip
    </button>
  )
}

export default SkipButton
