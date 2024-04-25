'use client'

import { useState, type ReactNode } from 'react'
import { useAblyTokenAtomClient } from '@/hooks/useAblyTokenAtomClient'
import { ablyClientAtom } from '@/app/room/[roomID]/atoms'

const ToSocket = ({ children }: Props) => {
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)

  useAblyTokenAtomClient(ablyClientAtom, undefined, {
    onSuccess: () => setIsSuccess(true),
  })

  if (isSuccess == null) return 'Connecting to websocket server...'
  return isSuccess ? children : 'Failed to connect to websocket server'
}

export default ToSocket

type Props = {
  children: ReactNode
}
