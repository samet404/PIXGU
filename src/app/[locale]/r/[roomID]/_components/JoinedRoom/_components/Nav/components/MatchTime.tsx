'use client'

import { useMatchStatusClient } from '@/zustand/store'

export const MatchTime = () => {
  const remainSeconds = useMatchStatusClient((s) => s.remainSeconds)

  if (remainSeconds) return (
    <div className="flex flex-row items-center gap-1 rounded-full bg-[rgba(255,255,255,0.20)] px-3 py-[0.35rem] text-[0.9rem] leading-3 text-[#ffffff84]  duration-[2000ms]">
      <div>
        {Math.floor(remainSeconds / 60)}m
      </div>
      <div>
        {remainSeconds % 60}s
      </div>
    </div>
  )
}
