'use client'

import { useMatchStatusClient } from '@/zustand/store/useMatchStatusClient'
import { useXY } from '@/zustand/store/useXY'

export const XY = () => {
  const status = useMatchStatusClient((s) => s.status)
  const XY = useXY((s) => s.value)

  if (XY && status === 'started') {
    const { x, y } = XY

    return (
      <div className='rounded-full bg-[#ffffff2e] px-2 h-full duration-200 text-[#ffffff52]'>
        {x} {y}
      </div>
    )
  }
}
