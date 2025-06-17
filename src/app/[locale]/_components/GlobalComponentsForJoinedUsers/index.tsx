import { Fragment, type ReactNode } from 'react'
import { LeftBottom } from './_components/LeftBottom'
import { Providers } from './_components/Providers'
import { api } from '@/trpc/server'
import type { Locale } from '@/types/locale'

// @ts-ignore https://github.com/microsoft/TypeScript/issues/59111
export const GlobalComponentsForJoinedUsers = async ({ locale, children }: Props) => {
  const isJoined = await api.auth.isJoined()
  console.log('global', locale)
  if (!isJoined) return children

  if (isJoined) return (
    <Fragment>
      <Providers>
        {children}
      </Providers>
      <LeftBottom locale={locale} />
    </Fragment>
  )

}


type Props = {
  children: ReactNode
  locale: Locale
}