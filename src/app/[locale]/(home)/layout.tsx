import { api } from '@/trpc/server'
import { redirect } from 'next/navigation'
import type { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
  const isLogged = api.auth.isLogged.query()
  if (!isLogged) redirect('/login')
  return children
}

export default Layout
