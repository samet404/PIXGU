import { percentageOf } from '@/utils/percentageOf'
import { create } from 'zustand'

const initState: State = {
    passedMiliseconds: 0,
    passedMilisecondsWithPercent: 0
}

export const usePainterSelectingRemainTime = create<State & Action>((set, get) => ({
    ...initState,

    add50ms: () =>
        set({
            ...get(),
            passedMiliseconds: get().passedMiliseconds! + 50,
            passedMilisecondsWithPercent: percentageOf(get().passedMiliseconds, 20000)
        }),

    reset: () => set({ ...initState })
}))

type State = {
    passedMiliseconds: number
    passedMilisecondsWithPercent: number
}

type Action = {
    add50ms: () => void
    reset: () => void
}