'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { useXY } from '@/zustand/store'
import { useEffect, useRef, useState } from 'react'

export const XY = () => {
  const XY = useXY((s) => s.value)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const [active, setActive] = useState<boolean>(false)

  useEffect(() => {
    clearTimeout(timeoutRef.current)
    setActive(true)
    timeoutRef.current = setTimeout(() => setActive(false), 1000)

    return () => clearTimeout(timeoutRef.current)
  }, [XY])


  if (XY) {
    const { x, y } = XY

    return (
      <div className={clsxMerge('rounded-full bg-[#ffffff24] px-2 h-full duration-200 text-[#ffffff52]', {
        'bg-[#ffffff2e]': active
      })}>
        {x} {y}
      </div>
    )
  }
}
