import { setIsJoined, setIsLogged } from '@/context/server'
import { api } from '@/trpc/server'
import type { PropsWithChildren } from 'react'
import { ServersidePreferences } from './_components/ServersidePreferences'

const Layout = async ({ children }: PropsWithChildren) => {
  const isJoined = await api.auth.isJoined.query()
  const isLogged = await api.auth.isLogged.query()
  setIsJoined(isJoined)
  setIsLogged(isLogged)

  return <ServersidePreferences>{children}</ServersidePreferences>
}

export default Layout
