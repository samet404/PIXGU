import { getIsLogged } from '@/context/server'
import type { PropsWithChildren } from 'react'
import dynamic from 'next/dynamic'

const Content = dynamic(() => import('./Content').then((m) => m.Content), {
  ssr: false,
})

export const ServersidePreferences = ({ children }: PropsWithChildren) => {
  const isLogged = getIsLogged()

  if (isLogged) return <Content>{children}</Content>
  return children
}
