import { Fragment, type PropsWithChildren } from 'react'
import { LeftBottom } from './_components/LeftBottom'
import { Providers } from './_components/Providers'

export const GlobalComponentsForJoinedUsers = ({ children }: PropsWithChildren) => {
  return (
    <Fragment>
      <Providers>
        {children}
      </Providers>
      <LeftBottom />
    </Fragment>
  )
}