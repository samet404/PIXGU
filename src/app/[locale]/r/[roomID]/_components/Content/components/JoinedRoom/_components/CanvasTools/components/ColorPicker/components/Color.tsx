'use client'

import { useRgba } from '@/zustand/store'

export const Color = () => {
  const color = useRgba((s) => s.value)

  return (
    <div
      style={{
        backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
      }}
      className="absolute bottom-0 h-[0.20rem] w-full rounded-lg"
    ></div>
  )
}
