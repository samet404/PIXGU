'use client'

import Forward from '@/svg/Forward'
import { Inter } from 'next/font/google'
const inter500 = Inter({
  subsets: ['latin'],
  weight: ['500'],
})

const SkipButton = () => {
  return (
    <button
      className={`${inter500.className} rounded-r-lg flex flex-row items-center gap-2 text-[rgba(0,0,0,0.5)] bg-[#ff7688] px-3 py-2`}
    >
      <Forward /> Skip
    </button>
  )
}

export default SkipButton
