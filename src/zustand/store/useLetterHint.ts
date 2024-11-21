import { create } from 'zustand'

const initState: State = {
    letters: []
}

export const useLetterHint = create<State & Action>((set, get) => ({
    ...initState,

    use: (input) => {
        console.log('used letter hint: ', input)

        set((state) => ({
            ...state,
            letters: [...state.letters, input]
        }))
    },

    reset: () => set({ ...initState })
}))

type State = {
    letters: string[]
}

type Action = {
    use: (input: string) => void
    reset: () => void
}