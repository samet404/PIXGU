'use client'

import { mToMs } from '@/utils/mToMs'
import { useMatchStatusClient } from '@/zustand/store'
import { useEffect, useRef, useState } from 'react'

export const MatchTime = () => {
  const [remainingMs, setRemainingMs] = useState<number | null>(null)
  const matchStatus = useMatchStatusClient((s) => s.status)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearIfAvailable = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      setRemainingMs(null)
    }
  }

  useEffect(() => {
    switch (matchStatus) {
      case 'init':
        clearIfAvailable()
        break
      case 'waitingForThemes':
        clearIfAvailable()
        break
      case 'started':
        {
          let innerRemainingMs = mToMs(4)

          intervalRef.current = setInterval(() => {
            setRemainingMs((prev) => prev! - 1000)
            innerRemainingMs -= 1000

            if (innerRemainingMs === 0) {
              clearIfAvailable()
            }
          }, 1000)
          setRemainingMs(mToMs(4))
        }
        break

      default:
        break
    }

    return () => clearIfAvailable()
  }, [matchStatus])

  return (
    <div className="flex flex-row items-center gap-3 rounded-full bg-[rgba(255,255,255,0.20)] px-3 py-[0.35rem]   duration-[2000ms]">
      <div className="text-[0.9rem] leading-3 text-[#ffffff84]">
        {remainingMs
          ? `${Math.floor(remainingMs / 1000 / 60)}m
         ${Math.floor((remainingMs / 1000) % 60)}s`
          : '-'}
      </div>
    </div>
  )
}
