'use client'

import { useState, type ReactNode } from 'react'
import { useAblyTokenAtomClient } from '@/hooks/useAblyTokenAtomClient'
import { ablyClientAtom } from '../../atoms'
import dynamic from 'next/dynamic'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))

const ConnectToSocket = ({ children }: Props) => {
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
  const [err, setErr] = useState<{ message: string } | null>(null)

  useAblyTokenAtomClient(ablyClientAtom, undefined, {
    onSuccess: () => setIsSuccess(true),
    onError: (e) =>
      setErr({
        message: e.message,
      }),
  })

  if (isSuccess) return children
  if (err)
    return (
      <ErrDisplay
        msg="Failed to connect socket server..."
        reason={err?.message}
        redirectTo="/join-room"
      />
    )
  return 'Connecting to websocket server...'
}

export default ConnectToSocket

type Props = {
  children: ReactNode
}
