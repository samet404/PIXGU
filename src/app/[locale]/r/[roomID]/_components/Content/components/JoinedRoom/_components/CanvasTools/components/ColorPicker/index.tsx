'use client'

import Image from 'next/image'
import { Tool } from '../Tool'
import { RgbaPicker } from './components/RgbaPicker'
import ColorPalette from '@/svg/color-palette-svgrepo-com.svg'

export const ColorPicker = () => {
  return (
    <Tool
      icon={
        <Image
          src={ColorPalette}
          alt="color"
          className="h-full w-full opacity-55"
        />
      }
      className="group hover:bg-[#ffffff44]"
    >
      <RgbaPicker />
    </Tool>
  )
}
