import type { PropsWithChildren } from 'react'
import { SocketIOProvider } from './components/SocketIO'

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <SocketIOProvider>
            {children}
        </SocketIOProvider>
    )
}