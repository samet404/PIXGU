import type { RouterInputs } from '@/trpc/shared'
import { create } from 'zustand'

type State = Partial<RouterInput>

type Action = {
  setName: (name: string | undefined) => void
  setPass: (pass: string | undefined) => void
  reset: () => void
}

const initialState: State = {
  name: undefined,
  password: undefined,
}

export const useCreateRoomInputs = create<State & Action>((set, get) => ({
  ...initialState,
  setName: (name) => set({ ...get(), name }),
  setPass: (pass) => set({ password: pass }),
  reset: () => set(initialState),
}))

type RouterInput = {
  name: string
  password: string | null
}
