import type { PropsWithChildren } from 'react'
import dynamic from 'next/dynamic'
import { getIsJoined } from '@/context/server'

const Content = dynamic(() => import('./Content').then((m) => m.Content))

export const ServersidePreferences = ({ children }: PropsWithChildren) => {
  const isJoined = getIsJoined()
  if (isJoined) return <Content>{children}</Content>
}
