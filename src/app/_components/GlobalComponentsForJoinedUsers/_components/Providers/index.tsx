import type { PropsWithChildren } from 'react'
import { InıtSettings } from './components/InıtSettings'

export const Providers = ({ children }: PropsWithChildren) => {
    return <InıtSettings>
        {children}
    </InıtSettings>
}