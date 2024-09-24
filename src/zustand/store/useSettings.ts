import { create } from 'zustand'
import type { RouterOutputs } from '@/trpc/shared'
import { subscribeWithSelector } from 'zustand/middleware'
import { syncTabs } from 'zustand-sync-tabs'

type TRPCGetAll = RouterOutputs['settings']['getAll']

type State = {
  others: {
    consoleLogFunc: typeof console.log | undefined
  }
} & TRPCGetAll

type PartitalState = Partial<State>

type Action = {
  setInitialState: (state: TRPCGetAll) => void
  setDeveloperMode: (isEnabled: boolean) => void
  setConsoleLogFun: (input: typeof console.log | undefined) => void
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
        setConsoleLogFun: (input) =>
          set({
            others: {
              consoleLogFunc: input,
            },
          }),
      }),
      { name: 'settings', exclude: ['others'] },
    ),
  ),
)
