'use client'

import { useXY } from '@/zustand/store'

export const XY = () => {
  const XY = useXY((s) => s.value)
  const { x, y } = XY

  return (
    <div className="rounded-lg bg-[#ffffff24] px-2 py-[0.1rem] text-[#ffffff52]">
      {x} {y}
    </div>
  )
}
