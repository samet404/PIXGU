'use client'

import { useCountStore } from '@/zustand/store'

export const Actions = () => {
  const increment = useCountStore((s) => s.increment)
  const decrement = useCountStore((s) => s.decrement)

  return (
    <div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}
