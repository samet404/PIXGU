'use client'

import { TestContext } from '@/context/client/react/taest'
import { useContext, useState } from 'react'

export const Counter = () => {
  const test = useContext(TestContext)
  const [count, setCount] = useState<number>(0)

  return (
    <div>
      {test.value}
      <button
        onClick={() => {
          setCount((prev) => prev + 1)
        }}
      >
        remder
      </button>
    </div>
  )
}
