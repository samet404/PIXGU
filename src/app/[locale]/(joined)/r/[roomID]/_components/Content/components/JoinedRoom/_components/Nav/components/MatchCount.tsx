'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { useMatchStatusClient, useTotalMatchCount } from '@/zustand/store'

export const MatchCount = () => {
  const count = useMatchStatusClient((s) => s.matchCount)
  const totalMatchCount = useTotalMatchCount((s) => s.value.totalMatchCount)

  if (count !== 0) return (
    <div
      className={clsxMerge(
        'flex flex-row items-center gap-3 rounded-full bg-[rgba(255,255,255,0.20)] px-3 py-[0.35rem]   duration-[2000ms]',
      )}
    >
      <div className="text-[0.9rem] leading-3 text-[#ffffff84]">
        Match: {count}/{totalMatchCount}
      </div>
    </div>
  )
}
