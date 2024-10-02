'use client'

import { usePainterTool } from '@/zustand/store'

export const Color = () => {
  const color = usePainterTool((s) => s.with.color)

  return (
    <div
      style={{
        backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      }}
      className="absolute bottom-0 h-[0.20rem] w-full rounded-lg"
    ></div>
  )
}
