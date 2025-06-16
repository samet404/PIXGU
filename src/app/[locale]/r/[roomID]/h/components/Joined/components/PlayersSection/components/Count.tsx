
'use client'

import { usePlayers } from '@/zustand/store/usePlayers'

export const Count = () => {
  const count = usePlayers((state) => state.value.count)

  return <div className="text-white">{count}/10</div>
}
