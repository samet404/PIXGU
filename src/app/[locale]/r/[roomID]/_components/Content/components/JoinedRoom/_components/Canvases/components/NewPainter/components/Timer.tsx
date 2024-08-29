'use client'

import { calcPercentage } from '@/utils/calcPercentage'
import { useEffect, useRef, useState } from 'react'

export const Timer = () => {
  const start = useRef<number>()
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!start.current) start.current = Date.now()

    const interval = setInterval(() => {
      const currentSecond = (Date.now() - start.current!) / 1000
      console.log(currentSecond)
      if (currentSecond >= 20) {
        clearInterval(interval)
        setWidth(100)
        return
      }

      setWidth(calcPercentage(currentSecond, 20))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const description = (() => {
    if (width > 100) return 'Time is up?'
    if (width > 60) return 'Time is running out'
    if (width > 50) return 'Tick tock'
    if (width > 25) return 'Painter selecting theme'
    return 'Selecting theme'
  })()

  return (
    <div className="absolute left-0 top-0 flex w-full flex-col items-start gap-2">
      <div
        style={{ width: `${width}%` }}
        className="animate-pass-input h-[1rem] rounded-t-[0.4rem] bg-gradient-to-r from-violet-500 to-violet-400  duration-75"
      ></div>

      <div className="pl-2 text-[1.1rem] font-[500] text-violet-500 ">
        {description}
      </div>
    </div>
  )
}
