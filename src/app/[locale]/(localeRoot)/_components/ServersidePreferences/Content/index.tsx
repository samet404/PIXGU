import type { PropsWithChildren } from 'react'
import { InıtSettings } from './components/InıtSettings'
import { api } from '@/trpc/server'

export const Content = async ({ children }: PropsWithChildren) => {
  const settings = await api.settings.getAll.query()

  return <InıtSettings settings={settings}>{children}</InıtSettings>
}
