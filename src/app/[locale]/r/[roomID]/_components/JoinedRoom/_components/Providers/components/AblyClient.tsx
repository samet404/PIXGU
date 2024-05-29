import type { ReactNode } from 'react'
import AblyClientProvider from '@/components/AblyClientProvider'

const AblyClient = ({ children, roomID }: Props) => (
  <AblyClientProvider
    clientOptions={{
      authUrl: `/r/${roomID}/api/ably/auth/token`,
    }}
  >
    {children}
  </AblyClientProvider>
)

export default AblyClient

type Props = {
  children: ReactNode
  roomID: string
}
