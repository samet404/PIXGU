'use client'

import { useAtomValue } from 'jotai'
import { pixelPerSecondAtom } from '../atoms'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400'],
})

const DrawPerSecondDisplay = () => {
  const pixelPerSecond = useAtomValue(pixelPerSecondAtom)

  return (
    <div
      className={`${inter.className} animate-fade-down text-sm text-[#ffffffc3]`}
    >
      {pixelPerSecond} px/s
    </div>
  )
}
export default DrawPerSecondDisplay
