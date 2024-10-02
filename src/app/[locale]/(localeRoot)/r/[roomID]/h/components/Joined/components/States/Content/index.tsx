'use client'

import { useMatchStatus } from '@/zustand/store'
import { Fragment, useState } from 'react'

export const Content = () => {
  const matchStatus = useMatchStatus((s) => s.value)
  const [isOpen, setisOpen] = useState<boolean>(false)

  return (
    <Fragment>
      <button
        className="absolute left-0 top-0 z-50 text-white"
        onClick={() => setisOpen(!isOpen)}
      >
        {isOpen ? 'Close' : 'Open'} debug
      </button>
      {isOpen && (
        <div className="absolute left-0 top-0 z-40 flex h-full w-full flex-col items-center justify-center bg-[#0000009e] backdrop-blur-sm">
          {Object.keys(matchStatus).map((key) => {
            const value = matchStatus[key as keyof typeof matchStatus]
            return (
              <div key={key} className="text-white">
                {key}: {value?.toString()}
              </div>
            )
          })}
        </div>
      )}
    </Fragment>
  )
}
