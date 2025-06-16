'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { useMatchStatusClient } from '@/zustand/store/useMatchStatusClient'
import { useTotalMatchCount } from '@/zustand/store/useTotalMatchCount'

export const MatchCount = ({ heading, description }: Props) => {
  const count = useMatchStatusClient((s) => s.matchCount)
  const totalMatchCount = useTotalMatchCount((s) => s.value.totalMatchCount)

  if (count !== 0) return (
    <div className='relative group'>
      <div
        className={clsxMerge(
          'flex flex-row group  items-center gap-3 rounded-full bg-[rgba(255,255,255,0.20)] px-3 py-[0.35rem]   duration-[2000ms]',
        )}
      >
        <div className="text-[0.9rem] leading-3 text-[#ffffff84]">
          {heading}: {count}/{totalMatchCount}
        </div>

      </div>
      <div className='px-2 py-1 w-48 text-xs absolute bg-[#ffffffc8] shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)] top-10 left-0 text-[#0f446296] backdrop-blur-[1px] rounded-md flex-col gap-1 group-hover:flex group-hover:animate-fade-down animate-duration-200 hidden'>
        {description}
      </div>
    </div>
  )
}

type Props = {
  heading: string
  description: string
}