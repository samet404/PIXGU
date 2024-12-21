import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const initState: State = {
    first: true,
    painterTool: true,
}

export const useGuide = create<State & Action>()(
    persist<State & Action>(
        (set, get) => ({
            ...initState,

            reset: () => set({ ...initState })
        }),
        { name: 'guide', }
    )
)

type State = {
    first: boolean
    painterTool: boolean
}

type Action = {
    reset: () => void
}

