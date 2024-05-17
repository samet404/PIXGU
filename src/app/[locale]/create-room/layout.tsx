import { api } from '@/trpc/server'
import type { Locale } from '@/types'
import { type ReactNode, Fragment } from 'react'

const CreateRoomLayout = async ({ params, children }: Props) => {
  const isLogged = await api.auth.isLogged.query()

  if (!isLogged) (await import('next/navigation')).redirect('/login')

  const setIsLogged = (await import('@/context/server')).setIsLogged
  const setLocale = (await import('@/context/server')).setLocale

  setIsLogged(isLogged)
  setLocale(params.locale)

  return <Fragment>{children}</Fragment>
}

export default CreateRoomLayout

type Props = {
  children: ReactNode
  params: {
    locale: Locale
  }
}
