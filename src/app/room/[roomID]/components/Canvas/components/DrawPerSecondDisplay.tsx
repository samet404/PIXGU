'use client'
import { useAtom, useAtomValue } from 'jotai'
import { pixelPerDrawAtom } from '../atoms'
import { useTimeout } from 'usehooks-ts'
import { useRef, useState } from 'react'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { Inter } from 'next/font/google'
import type { PixelPerDraw } from '../types'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400'],
})

const DrawPerSecondDisplay = () => {
  const pixelPerDraw = useAtomValue(pixelPerDrawAtom)
  const [pixelPerDrawDisplayData, setPixelPerDrawDisplayData] =
    useState<PixelPerDraw | null>()
  const latestCount = useRef<number | null>()

  console.log(pixelPerDraw)

  if (!pixelPerDraw?.remainingTime)
    latestCount.current = pixelPerDraw?.pixelCount

  useTimeout(() => {
    if (pixelPerDraw?.remainingTime) {
      setPixelPerDrawDisplayData(pixelPerDraw)
      latestCount.current = pixelPerDraw?.pixelCount
    }
  }, pixelPerDraw?.remainingTime ?? 0)

  const value = (() => {
    if (pixelPerDrawDisplayData?.remainingTime) {
      if (latestCount.current) return latestCount.current
      if (!latestCount.current) return 0
    }

    return 0
  })()

  return (
    <div
      className={`${inter.className} animate-fade-down text-sm text-[#ffffffc3]`}
    >
      {value}
      px/s
    </div>
  )
}

export default DrawPerSecondDisplay
