import dynamic from 'next/dynamic'
import type { PropsWithChildren } from 'react'

const Content = dynamic(() => import('./Content').then((m) => m.Content))

export const Password = ({ havePassword, children }: Props) => {
    if (havePassword) return <Content>
        {children}
    </Content>
    return children
}

type Props = PropsWithChildren<{
    havePassword: boolean
}>