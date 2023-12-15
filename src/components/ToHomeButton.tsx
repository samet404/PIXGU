'use client'

import { useRouter } from 'next/navigation'
import { type ComponentProps, type ReactNode } from 'react'

type ToHomeButtonType = {
  children: ReactNode
} & ComponentProps<'button'>

const ToHomeButton = ({ children, ...rest }: ToHomeButtonType) => {
  const router = useRouter()

  return (
    <button onClick={() => router.push('/')} {...rest}>
      {children}
    </button>
  )
}

export default ToHomeButton
