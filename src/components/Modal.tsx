'use client'

import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { useEventListener } from 'usehooks-ts'

const Modal = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      router.back()
    }
  }

  return (
    <div className="absolute z-50 h-full w-full bg-[rgba(0,0,0,0.4)]">
      {children}
    </div>
  )
}

export default Modal
