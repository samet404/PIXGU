'use client'

import { usePainterTool } from '@/zustand/store'

export const Color = () => {
  const color = usePainterTool((s) => s.with.color)

  return (
    <div
      style={{
        backgroundColor: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] / 255})`,
      }}
      className="absolute bottom-0 h-[0.20rem] w-full rounded-lg"
    ></div>
  )
}
