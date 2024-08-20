'use client'

import { useState, type PropsWithChildren } from 'react'
import { useInterval } from 'usehooks-ts'

export const Parent = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0)

  useInterval(() => {
    setCount((prev) => prev + 1)
  }, 1000)

  return (
    <div className="flex flex-col">
      <div>count: {count}</div>
      {children}
    </div>
  )
}
