import type { RouterInputs } from '@/trpc/shared'
import { create } from 'zustand'

type State = { value: Partial<RouterInput> }

type Action = {
  add: (input: Partial<RouterInput>) => void
  get: () => Partial<RouterInput>
}

export const useCreateRoomInputs = create<State & Action>((set, get) => ({
  value: {
    isHostPlayer: true,
  },

  add: (input) => {
    set({ value: { ...get().value, ...input } })
  },
  get: () => get().value,
}))

type RouterInput = RouterInputs['gameRoom']['create']
