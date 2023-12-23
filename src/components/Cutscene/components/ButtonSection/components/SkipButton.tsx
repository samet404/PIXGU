'use client'

import Forward from '@/public/image/svg/Forward'
import { Inter } from 'next/font/google'
const inter500 = Inter({
  subsets: ['latin'],
  weight: ['500'],
})

const SkipButton = () => {
  return (
    <button
      className={`${inter500.className} flex flex-row items-center gap-2 rounded-r-lg bg-[#ff7688] px-3 py-2 text-[rgba(0,0,0,0.5)]`}
    >
      <Forward /> Skip
    </button>
  )
}

export default SkipButton
