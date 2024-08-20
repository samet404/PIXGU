'use client'

import { useTopNavbarText } from '@/zustand/store/useTopNavbarText'

export const Text = () => {
  const text = useTopNavbarText((state) => state.text)

  return (
    <div className="animate-pulse text-[#ffffffa0] animate-duration-1000">
      {text}
    </div>
  )
}
