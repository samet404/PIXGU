'use client'

import { useMatchStatus } from '@/zustand/store'

const States = () => {
  const matchStatus = useMatchStatus((s) => s.value)

  return (
    <div>
      {Object.keys(matchStatus).map((key) => {
        const value = matchStatus[key as keyof typeof matchStatus]
        return (
          <div key={key} className="text-white">
            {key}: {value?.toString()}
          </div>
        )
      })}
    </div>
  )
}

export default States
