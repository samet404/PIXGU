/* eslint-disable @typescript-eslint/no-empty-function */
'use client'

import type { PropsWithChildren } from 'react'
import { useDeveloperSettings } from '@/zustand/store'

export const InıtSettings = ({
  children,
}: PropsWithChildren) => {
  const setConsoleLogFuncs = useDeveloperSettings((s) => s.setConsoleLogFuncs)
  const isOpen = useDeveloperSettings(s => s.isOpen)

  if (!isOpen) {
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


  return children
}
