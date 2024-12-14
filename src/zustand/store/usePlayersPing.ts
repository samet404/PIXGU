import { create } from 'zustand'

type State = {
    pings: Record<string, number | undefined>
}

type Action = {
    set: (ping: number | undefined, userID: string) => void
    reset: () => void
}

const initState: State = {
    pings: {},
}

export const usePlayersPing = create<State & Action>((set, get) => ({
    ...initState,

    set: (ping, userID) =>
        set({
            ...get(),
            pings: {
                ...get().pings,
                [userID]: ping,
            },
        }),


    reset: () => set({ ...initState })
}))
