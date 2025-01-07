import { create } from 'zustand'

const initState: State = {
    value: {
        amIGaveUp: false
    }
}

export const useAmIGaveUp = create<State & Action>((set, get) => ({
    ...initState,

    giveUp: () => set({ value: { amIGaveUp: true } }),
    reset: () => set({ ...initState })
}))

type State = {
    value: {
        amIGaveUp: boolean
    }
}

type Action = {
    giveUp: () => void
    reset: () => void
}