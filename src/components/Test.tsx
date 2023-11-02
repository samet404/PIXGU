'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useReducer, useState } from 'react'

// const reducer = (state, action) => {
  
// }


const Test = () => {
  const [count, setCount] = useState(0)
  const pathname = usePathname()

  // const [state, dispatch] = useReducer(reducer, { count: 0 })

  const handleIncrement = () => {
    setCount((prev) => prev - 1)
  }

  const handleDecrement = () => {
    setCount((prev) => prev - 1)
  }

  return (
    <div
      className={clsx('bg-blue-950 text-white flex flex-row gap-2', {
        'bg-violet-600': pathname === '/login',
      })}
    >
      <div>{pathname}</div>

      <button onClick={handleIncrement}>-</button>
      <div>{count}</div>
      <button onClick={handleDecrement}>+</button>
    </div>
  )
}

export default Test


