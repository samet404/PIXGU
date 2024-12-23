'use client'

import { usePainterSelectingRemainTime } from '@/zustand/store'

export const Timer = () => {
  const width = usePainterSelectingRemainTime((s) => s.passedMilisecondsWithPercent)

  const description = (() => {
    if (width > 100) return 'Time is up?'
    if (width > 60) return 'Time is running out'
    if (width > 50) return 'Tick tock'
    if (width > 25) return 'Painter selecting theme'
    return 'Selecting theme'
  })()

  return (
    <div className="absolute left-0 top-0 flex w-full animate-fade flex-col items-start gap-2">
      <div className="h-[1rem] w-full rounded-[0.4rem] bg-violet-200 shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)] ">
        <div
          style={{ width: `${width}%` }}
          className="h-full animate-[pass-input_4s_ease-in-out_infinite] rounded-[0.4rem]  bg-gradient-to-r  from-violet-600 via-violet-200 to-violet-600 bg-[length:400%_400%]"
        ></div>
      </div>

      <div className="pl-2 text-[1rem] font-[500] text-violet-500 ">
        {description}
      </div>
    </div>
  )
}
