'use client'

import { useCountStore } from '@/zustand/store/useCountStore'

const Counter = () => {
  const count = useCountStore((state) => state.count)
  const increment = useCountStore((state) => state.increment)
  const decrement = useCountStore((state) => state.decrement)
  const reset = useCountStore((state) => state.reset)

  return (
    <div className="flex flex-row gap-2">
      <div>{count}</div>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}
export default Counter
