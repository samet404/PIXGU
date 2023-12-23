'use client'

import { useRef, type ReactNode } from 'react'

const HoverEffectDiv = ({ children }: { children: ReactNode }) => {
  const divRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {}

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className="flex h-full w-full flex-col items-center gap-3 overflow-y-auto duration-500 "
    >
      {children}
    </div>
  )
}

export default HoverEffectDiv
