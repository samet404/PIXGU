import { Fragment, type PropsWithChildren } from 'react'
import { LeftBottom } from './_components/LeftBottom'
import { Providers } from './_components/Providers'
import { api } from '@/trpc/server'

// @ts-ignore https://github.com/microsoft/TypeScript/issues/59111
export const GlobalComponentsForJoinedUsers = async ({ children }: PropsWithChildren) => {
  const isJoined = await api.auth.isJoined.query()

  if (!isJoined) return children

  if (isJoined) return (
    <Fragment>
      <Providers>
        {children}
      </Providers>
      <LeftBottom />
    </Fragment>
  )

}

