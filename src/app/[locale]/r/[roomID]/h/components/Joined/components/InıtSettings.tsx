'use client'

import type { RouterOutputs } from '@/trpc/shared'
import type { PropsWithChildren } from 'react'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useSettings } from '@/zustand/store'
import { useInterval } from 'usehooks-ts'

export const InıtSettings = ({
  settings,
  children,
}: PropsWithChildren<{ settings: RouterOutputs['settings']['getAll'] }>) => {
  const isDeveloperMode = useSettings((s) => s.developerMode)
  const setConsoleLog = useSettings((s) => s.setConsoleLogFun)

  useInterval(() => console.log('interval'), 1000)

  const setDeveloperMode = (isEnabled: boolean | undefined) => {
    if (!isEnabled) {
      setConsoleLog(console.log)
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      console.log = function () {}
      return
    }

    const consoleLog = useSettings.getState().others?.consoleLogFunc

    if (consoleLog) {
      console.log = consoleLog
      setConsoleLog(undefined)
    }
  }

  useEffectOnce(() => {
    setDeveloperMode(settings.developerMode)
    useSettings.subscribe(
      (s) => s.developerMode,
      (isEnabled) => setDeveloperMode(isEnabled),
    )
    useSettings.getState().setInitialState(settings)
  })

  return children
}
