import { create } from 'zustand'

const initState: State = {
    users: []
}

export const useGuessersWhoGaveUp = create<State & Action>((set, get) => ({
    ...initState,

    isGaveUp: (ID) => get().users.includes(ID),
    add: (ID) => set({ users: [...get().users, ID] }),
    reset: () => set({ ...initState })
}))

type State = {
    users: string[]
}

type Action = {
    isGaveUp: (ID: string) => boolean
    add: (ID: string) => void
    reset: () => void
}