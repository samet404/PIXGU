'use client'

import AblyClientProvider from '@/components/AblyClientProvider'
import { type ReactNode } from 'react'

const AblyProviderWrapper = ({ children }: Props) => {
  return (
    <AblyClientProvider
      clientOptions={{
        authUrl: '/api/ably/auth/token/test',
      }}
    >
      {children}
    </AblyClientProvider>
  )
}

export default AblyProviderWrapper

type Props = {
  children: ReactNode
}
