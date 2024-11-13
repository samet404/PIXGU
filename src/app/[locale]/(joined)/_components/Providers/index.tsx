import type { PropsWithChildren } from 'react'
import { ServersidePreferences } from './components/ServersidePreferences'

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <ServersidePreferences>
            {children}
        </ServersidePreferences>
    )
}