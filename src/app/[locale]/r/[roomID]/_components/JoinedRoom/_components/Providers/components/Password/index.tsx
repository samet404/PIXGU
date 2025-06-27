import dynamic from 'next/dynamic'
import type { PropsWithChildren } from 'react'

const Content = dynamic(() => import('./Content').then((m) => m.Content))

export const Password = ({
  children,
  havePassword,
}: PropsWithChildren<{
  havePassword: string
}>) => {
  if (havePassword) return <Content>{children}</Content>
  return children
}
