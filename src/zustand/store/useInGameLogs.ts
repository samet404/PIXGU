import { persistNSync } from 'persist-and-sync'
import { create } from 'zustand'

const initState: State = {
    isOpen: false
}

export const useInGameLogs = create<State & Action>()(
    persistNSync<State & Action>(
        (set, get) => ({
            ...initState,

            switch: () => set({ isOpen: !get().isOpen }),
            reset: () => set({ ...initState })
        }),
        { name: 'in-game-logs' },
    ),
)

type State = {
    isOpen: boolean
}

type Action = {
    switch: () => void
    reset: () => void
}