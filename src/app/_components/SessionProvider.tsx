'use client'

import { SessionProvider } from 'next-auth/react'
import { type ReactNode } from 'react'

const NextAuthSessionProvider = ({ children }: { children: ReactNode }) => (
  <SessionProvider>{children}</SessionProvider>
)

export default NextAuthSessionProvider
