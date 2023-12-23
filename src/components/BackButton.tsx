'use client'

import type { ComponentProps, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

type BackButtonProps = { children: ReactNode } & ComponentProps<'button'>

const BackButton = ({ children, ...rest }: BackButtonProps) => {
  const router = useRouter()

  return (
    <button onClick={() => router.back()} {...rest}>
      {children}
    </button>
  )
}
export default BackButton
