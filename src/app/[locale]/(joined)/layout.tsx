import { setIsLogged } from '@/context/server'
import { api } from '@/trpc/server'
import type { PropsWithChildren } from 'react'
import { ServersidePreferences } from './_components/ServersidePreferences'

const Layout = async ({ children }: PropsWithChildren) => {
  const isLogged = await api.auth.isLogged.query()
  setIsLogged(isLogged)

  if (!isLogged)
    return <ServersidePreferences>{children}</ServersidePreferences>

  return children
}

export default Layout
