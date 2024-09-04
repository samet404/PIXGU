'use client'

import { useCountStore } from '@/zustand/store'
import { useRoomIDStore } from '@/zustand/provider'
import { useState } from 'react'

const Counter = () => {
  const [number, setNumber] = useState(0)
  console.log('Component rendered!')
  const count = useCountStore((state) => state.count)
  const increment = useCountStore((state) => state.increment)
  const decrement = useCountStore((state) => state.decrement)
  const reset = useCountStore((state) => state.reset)
  const roomID = useRoomIDStore((state) => state.roomID)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-4">
        <div>{count}</div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>reset</button>
        <button
          onClick={() => {
            console.log(useCountStore.getState().count)
          }}
        >
          log
        </button>
      </div>
      <div className="flex flex-row">
        <div>{number}</div>

        <button onClick={() => setNumber(Math.random())}>random num</button>
      </div>
      <div>{roomID}</div>
    </div>
  )
}
export default Counter
