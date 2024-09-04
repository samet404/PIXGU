'use client'

import { getRoomID } from '@/context/client/room'
import { useState } from 'react'

export const Client2 = () => {
  const [count, setCount] = useState(0)
  return (
    <div onClick={() => setCount((prev) => prev + 1)} className="bg-pink-600">
      dsadsa {getRoomID()}
    </div>
  )
}
