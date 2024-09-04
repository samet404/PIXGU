'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { useMatchCount } from '@/zustand/store'

export const Match = () => {
  const count = useMatchCount((s) => s.count)

  return (
    <div
      className={clsxMerge(
        'flex flex-row items-center gap-3 rounded-full bg-[rgba(255,255,255,0.20)] px-3 py-[0.35rem]   duration-[2000ms]',
      )}
    >
      <div className="text-[0.9rem] leading-3 text-[#ffffff84]">
        Match: {count}/10
      </div>
    </div>
  )
}
