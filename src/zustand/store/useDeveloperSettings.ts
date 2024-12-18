import { subscribeWithSelector } from 'zustand/middleware'
import { persistNSync } from 'persist-and-sync'
import { create } from 'zustand'


type State = {
  isOpen: boolean
  others?: {
    consoleLog: typeof console.log | undefined
    consoleError: typeof console.error | undefined
    consoleInfo: typeof console.info | undefined
    consoleWarn: typeof console.warn | undefined
  }
}


type Action = {
  switch: () => void
  setConsoleLogFuncs: (
    consoleLog: typeof console.log | undefined,
    consoleError: typeof console.error | undefined,
    consoleInfo: typeof console.info | undefined,
    consoleWarn: typeof console.warn | undefined,
  ) => void
}

const initState: State = {
  isOpen: false
}

export const useDeveloperSettings = create<State & Action>()(
  subscribeWithSelector(
    persistNSync<State & Action>(
      (set, get) => ({
        ...initState,

        switch: () => {
          set({
            ...get(),
            isOpen: !get().isOpen
          })
        },
        setConsoleLogFuncs: (
          consoleLog,
          consoleError,
          consoleInfo,
          consoleWarn,
        ) =>
          set({
            others: {
              consoleLog,
              consoleError,
              consoleInfo,
              consoleWarn,
            },
          }),
      }),
      { name: 'developer', exclude: ['others'] },
    ),
  ),
)
