'use client'

import { type ReactNode } from 'react'

const HoverEffectDiv = ({ children }: { children: ReactNode }) => {
  console.log('HoverEffectDiv rendered')
  return (
    <div className="flex h-full w-full flex-col items-center gap-3 overflow-y-auto duration-500 ">
      {children}
    </div>
  )
}

export default HoverEffectDiv
