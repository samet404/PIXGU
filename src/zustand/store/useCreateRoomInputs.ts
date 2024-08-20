import type { RouterInputs } from '@/trpc/shared'
import { create } from 'zustand'

type State = { value: Partial<RouterInputs['gameRoom']['create']> }

type Action = {
  add: (input: Partial<RouterInputs['gameRoom']['create']>) => void
  get: () => Partial<RouterInputs['gameRoom']['create']>
}

export const useCreateRoomInputs = create<State & Action>((set, get) => ({
  value: {
    isHostPlayer: false,
  },

  add: (input) => {
    get().value = { ...get().value, ...input }
  },
  get: () => get().value,
}))
