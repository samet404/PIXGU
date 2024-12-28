// @ts-nocheck

import type { PropsWithChildren } from 'react'
import { GlobalComponentsForJoinedUsers } from './_components/GlobalComponentsForJoinedUsers'
import type { Locale } from '@/types/locale'

const Layout = async ({ children, params }: Props) => {
  const { locale } = await params

  return (
    <GlobalComponentsForJoinedUsers locale={locale}>
      {children}
    </GlobalComponentsForJoinedUsers >
  )
}

export default Layout

type Props = PropsWithChildren<{
  params: Promise<{
    locale: Locale
  }>
}>