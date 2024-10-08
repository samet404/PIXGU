import { setIsLogged } from '@/context/server'
import { api } from '@/trpc/server'
import type { PropsWithChildren } from 'react'
import { ServersidePreferences } from './_components/ServersidePreferences'
import { SocketIO } from './_components/Providers/SocketIO'

const Layout = async ({ children }: PropsWithChildren) => {
  const isLogged = await api.auth.isLogged.query()
  setIsLogged(isLogged)

  return (
    // <SocketIO>
    <ServersidePreferences>{children}</ServersidePreferences>
    // </SocketIkO>
  )
}

export default Layout
