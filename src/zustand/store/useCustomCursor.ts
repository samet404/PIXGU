import { persistNSync } from 'persist-and-sync'
import { create } from 'zustand'

const initState: State = {
    isOpen: false
}

export const useCustomCursor = create<State & Action>()(
    persistNSync<State & Action>((set, get) => ({
        ...initState,

        switch: () => set({ isOpen: !get().isOpen }),
        reset: () => set({ ...initState })

    }), { name: 'customCursor' }),
)

type State = {
    isOpen: boolean
}

type Action = {
    switch: () => void
    reset: () => void
}