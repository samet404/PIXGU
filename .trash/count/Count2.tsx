'use client'

import { useCountStore } from '@/zustand/store'

export const Count2 = () => {
  const count = useCountStore((s) => s.count2)
  console.log('re rendered count 2')
  return <div>count2: {count}</div>
}
