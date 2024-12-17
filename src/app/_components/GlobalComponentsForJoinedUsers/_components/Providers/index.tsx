import type { PropsWithChildren } from 'react'
import { api } from '@/trpc/server'
import { InıtSettings } from './components/InıtSettings'

export const Providers = async ({ children }: PropsWithChildren) => {
    const settings = await api.settings.getAll.query()

    return <InıtSettings settings={settings}>{children}</InıtSettings>
}