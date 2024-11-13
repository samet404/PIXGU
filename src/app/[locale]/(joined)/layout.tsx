import { setIsJoined, setIsLogged } from '@/context/server'
import { api } from '@/trpc/server'
import type { PropsWithChildren } from 'react'
import { LeftBottom } from './_components/LeftBottom'
import { Providers } from './_components/Providers'

const Layout = async ({ children }: PropsWithChildren) => {
  const isJoined = await api.auth.isJoined.query()
  const isLogged = await api.auth.isLogged.query()
  setIsJoined(isJoined)
  setIsLogged(isLogged)

  return <Providers>
    <LeftBottom />
    {children}
  </Providers>
}

export default Layout
