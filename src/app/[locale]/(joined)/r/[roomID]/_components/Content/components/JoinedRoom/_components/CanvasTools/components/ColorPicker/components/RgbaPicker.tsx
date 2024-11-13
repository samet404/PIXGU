"use client"

import { usePainterTool } from '@/zustand/store'
import { type RgbaColor, RgbaColorPicker } from 'react-colorful'

export const RgbaPicker = () => {
  const color = usePainterTool(s => s.with.color)
  const handleOnChange = ({ r, g, b, a }: RgbaColor) =>
    usePainterTool.getState().setRGBA([r, g, b, a * 255])

  return (
    <div className="absolute top-2 z-50 hidden h-[12rem] w-[14rem] p-6 group-hover:flex">
      <RgbaColorPicker
        style={{
          width: '100%',
          height: '100%',
          filter: 'drop-shadow(0px 0px 2px rgba(0,0,0,0.7))',
        }}
        color={{
          r: color[0],
          g: color[1],
          b: color[2],
          a: color[3] / 255,
        }}
        className="z-50 h-full w-full  animate-fade rounded-md bg-[#ffffff7b] animate-duration-75"
        onChange={handleOnChange}
      />
    </div>
  )
}
