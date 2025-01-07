import { create } from 'zustand'

const initState: State = {
    value: {
        amILoser: false
    }
}

export const useAmILoser = create<State & Action>((set, get) => ({
    ...initState,

    losed: () => set({ value: { amILoser: true } }),
    reset: () => set({ ...initState })
}))

type State = {
    value: {
        amILoser: boolean
    }
}

type Action = {
    losed: () => void
    reset: () => void
}