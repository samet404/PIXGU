'use client'

import { useXY } from '@/zustand/store'

export const XY = () => {
  const XY = useXY((s) => s.value)

  if (XY) {
    const { x, y } = XY

    return (
      <div className='rounded-full bg-[#ffffff2e] px-2 h-full duration-200 text-[#ffffff52]'>
        {x} {y}
      </div>
    )
  }
}
