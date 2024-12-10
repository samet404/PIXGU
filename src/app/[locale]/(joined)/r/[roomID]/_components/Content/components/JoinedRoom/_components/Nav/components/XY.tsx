'use client'

import { useXY } from '@/zustand/store'
import { useEffect, useRef } from 'react'

export const XY = () => {
  const XY = useXY((s) => s.value)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  if (XY) {
    const { x, y } = XY

    return (
      <div className='rounded-full bg-[#ffffff2e] px-2 h-full duration-200 text-[#ffffff52]'>
        {x} {y}
      </div>
    )
  }
}
