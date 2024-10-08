'use client'

/* eslint-disable @typescript-eslint/no-empty-function */

import type { RouterOutputs } from '@/trpc/shared'
import type { PropsWithChildren } from 'react'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useSettings } from '@/zustand/store'
import { useInterval } from 'usehooks-ts'

export const InıtSettings = ({
  settings,
  children,
}: PropsWithChildren<{ settings: RouterOutputs['settings']['getAll'] }>) => {
  const setConsoleLogFuncs = useSettings((s) => s.setConsoleLogFuncs)

  const setDeveloperMode = (isEnabled: boolean | undefined) => {
    if (!isEnabled) {
      setConsoleLogFuncs(console.log, console.error, console.info, console.warn)
      console.log = function () {}
      console.error = function () {}
      console.info = function () {}
      console.warn = function () {}

      return
    }

    const consoleLog = useSettings.getState().others?.consoleLog
    const consoleError = useSettings.getState().others?.consoleError
    const consoleInfo = useSettings.getState().others?.consoleInfo
    const consoleWarn = useSettings.getState().others?.consoleWarn

    if (consoleLog && consoleError && consoleInfo && consoleWarn) {
      console.log = consoleLog
      console.error = consoleError
      console.info = consoleInfo
      console.warn = consoleWarn
      setConsoleLogFuncs(undefined, undefined, undefined, undefined)
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
