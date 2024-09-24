import { syncTabs } from 'zustand-sync-tabs'
import { create } from 'zustand'

export const useMyStore = create<{
  count: number
  _count: number
  setCount: (count: number) => void
  set_Count: (_count: number) => void
}>()(
  syncTabs(
    (set) => ({
      count: 0,
      _count: 0 /** skipped as it is included in exclude array */,
      setCount: (count) => {
        set((state) => ({ ...state, count }))
      },
      set_Count: (_count) => {
        set((state) => ({ ...state, _count }))
      },
    }),
    { name: 'example', exclude: ['_count'] },
  ),
)
