'use client'

/* eslint-disable @typescript-eslint/no-empty-function */

import type { RouterOutputs } from '@/trpc/shared'
import type { PropsWithChildren } from 'react'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useDeveloperSettings } from '@/zustand/store'

export const InıtSettings = ({
  settings,
  children,
}: PropsWithChildren<{ settings: RouterOutputs['settings']['getAll'] }>) => {
  const setConsoleLogFuncs = useDeveloperSettings((s) => s.setConsoleLogFuncs)

  const setDeveloperMode = (isEnabled: boolean | undefined) => {
    if (!isEnabled) {
      setConsoleLogFuncs(console.log, console.error, console.info, console.warn)
      console.log = function () { }
      console.error = function () { }
      console.info = function () { }
      console.warn = function () { }

      return
    }

    const consoleLog = useDeveloperSettings.getState().others?.consoleLog
    const consoleError = useDeveloperSettings.getState().others?.consoleError
    const consoleInfo = useDeveloperSettings.getState().others?.consoleInfo
    const consoleWarn = useDeveloperSettings.getState().others?.consoleWarn

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
    useDeveloperSettings.subscribe(
      (s) => s.developerMode,
      (isEnabled) => setDeveloperMode(isEnabled),
    )
    useDeveloperSettings.getState().setInitialState(settings)
  })

  return children
}
