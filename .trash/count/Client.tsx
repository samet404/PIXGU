'use client'

import { useCountStore } from '@/zustand/store'

export const Client = () => {
  const count = useCountStore((s) => s.count)
  console.log('re rendered count 1')

  return <div>count1: {count}</div>
}
