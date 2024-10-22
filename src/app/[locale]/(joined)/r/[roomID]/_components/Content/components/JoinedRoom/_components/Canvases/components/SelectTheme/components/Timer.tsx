'use client'

import { percentageOf } from '@/utils/percentageOf'
import { useEffect, useRef, useState, type PropsWithChildren } from 'react'

export const Timer = ({ children }: PropsWithChildren) => {
  const start = useRef<number | null>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!start.current) start.current = Date.now()

    const interval = setInterval(() => {
      const currentSecond = (Date.now() - start.current!) / 1000
      if (currentSecond >= 20) {
        clearInterval(interval)
        setHeight(100)
        return
      }

      setHeight(percentageOf(currentSecond, 20))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute z-40 flex h-full w-full items-center justify-center rounded-[0.4rem] bg-violet-300 p-2">
      <div
        style={{ height: `${height}%` }}
        className="absolute bottom-0 w-full animate-position rounded-[0.4rem]   bg-gradient-to-tr from-violet-500 to-violet-500 duration-75"
      ></div>
      {children}
    </div>
  )
}
