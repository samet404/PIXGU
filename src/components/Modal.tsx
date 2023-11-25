'use client'

import { useRouter } from 'next/navigation'
import { useRef, type ReactNode } from 'react'
import { useEventListener } from 'usehooks-ts'

const Modal = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  // const documentRef = useRef<Document>(document)

  // const handleKeydown = (e: KeyboardEvent) => {
  //   if (e.key === 'Escape') {
  //     e.preventDefault()
  //     router.back()
  //   }
  // }

  // useEventListener('keydown', handleKeydown, documentRef)

  return (
    <div className="absolute z-50 h-full w-full bg-[rgba(0,0,0,0.7)]">
      {children}
    </div>
  )
}

export default Modal
