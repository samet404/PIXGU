import { setLocale } from '@/context/server'
import { api } from '@/trpc/server'
import type { Locale } from '@/types'
import { redirect } from 'next/navigation'
import { Fragment, type ReactNode } from 'react'

const LoginLayout = async ({ params, children }: Props) => {
  const isLogged = await api.auth.isLogged.query()
  if (isLogged) redirect('/')

  setLocale(params.locale)

  return <Fragment>{children}</Fragment>
}

export default LoginLayout

type Props = {
  params: { locale: Locale }
  children: ReactNode
}
