import { create } from 'zustand'

type State = { text: string | null }

type Action = {
    setAlert: (input: string | null) => void
    get: () => string | null
    reset: () => void
}

const initValue = { text: null }

export const useGameToolAlert = create<State & Action>((set, get) => ({
    ...initValue,

    setAlert: (input) => set({ text: input }),
    get: () => get().text,
    reset: () => set({ ...initValue }),
}))
