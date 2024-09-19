import { create } from 'zustand'

type State = {
  isOpen: boolean
}

type Action = {
  open: () => void
  close: () => void
  toggle: () => void
  reset: () => void
}

const initValue: State = {
  isOpen: false,
}

export const useIsEyeDropperOpen = create<State & Action>((set, get) => ({
  ...initValue,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
  reset: () => set(initValue),
}))
