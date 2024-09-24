'use client'

import { useState } from 'react'

export const Count = () => {
  const [count, setCount] = useState<number>(0)
  return (
    <div
      onMouseDown={() => {
        setCount(count + 1)
        setCount(count + 1)
      }}
    >
      Count {count}
    </div>
  )
}
