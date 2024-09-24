'use client'

import { useMyStore } from '@/zustand/store'

export const Client = () => {
  const setCount = useMyStore((s) => s.setCount)
  const count = useMyStore((s) => s.count)
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}
