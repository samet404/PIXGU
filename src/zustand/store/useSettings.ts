import type { RouterOutputs } from '@/trpc/shared'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { syncTabs } from 'zustand-sync-tabs'

type TRPCGetAllSettings = RouterOutputs['settings']['getAll']

type State = {
  others: {
    consoleLog: typeof console.log | undefined
    consoleError: typeof console.error | undefined
    consoleInfo: typeof console.info | undefined
    consoleWarn: typeof console.warn | undefined
  }
} & TRPCGetAllSettings

type PartitalState = Partial<State>

type Action = {
  setInitialState: (state: TRPCGetAllSettings) => void
  setDeveloperMode: (isEnabled: boolean) => void
  setConsoleLogFuncs: (
    consoleLog: typeof console.log | undefined,
    consoleError: typeof console.error | undefined,
    consoleInfo: typeof console.info | undefined,
    consoleWarn: typeof console.warn | undefined,
  ) => void
}

const initState: PartitalState = {}

export const useSettings = create<PartitalState & Action>()(
  subscribeWithSelector(
    syncTabs<PartitalState & Action>(
      (set, get) => ({
        ...initState,
        setInitialState: (state) => {
          set({
            ...get(),
            ...state,
          })
        },
        setDeveloperMode: (isEnabled) => {
          set({
            ...get(),
            developerMode: isEnabled,
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
      { name: 'settings', exclude: ['others'] },
    ),
  ),
)
