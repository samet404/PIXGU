'use client'

import { useXY } from '@/zustand/store'

export const XY = () => {
  const XY = useXY((s) => s.value)
  const { x, y } = XY

  return (
    <div className="rounded-lg bg-[#ffffff3f] px-2 py-1 text-[#ffffffb5]">
      {x} {y}
    </div>
  )
}
