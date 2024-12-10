
import { create } from 'zustand'

const initState: State = {
    value: {
        totalMatchCount: null,
        userPainterAccesCount: null,
    },
}

export const useTotalMatchCount = create<State & Actions>((set, get) => ({
    ...initState,

    decreaseTotalMatchCount: (count) => set({
        ...get(),

        value: {
            ...get().value,
            totalMatchCount: get().value.totalMatchCount! - count,
        },
    }),

    set: (playerCount) => {
        let totalMatchCount: number
        let userPainterAccesCount: number

        switch (playerCount) {
            case 2:
                totalMatchCount = 4
                userPainterAccesCount = 2
                break
            case 3:
                totalMatchCount = 6
                userPainterAccesCount = 2
                break
            case 4:
                totalMatchCount = 8
                userPainterAccesCount = 2
                break
            case 5:
                totalMatchCount = 10
                userPainterAccesCount = 2
                break
            default:
                totalMatchCount = playerCount
                userPainterAccesCount = 1
                break
        }


        set({
            value: {
                totalMatchCount,
                userPainterAccesCount,
            },
        })
    },
    reset: () => set({ ...initState })
}))

type State = {
    value: {
        totalMatchCount: number | null
        userPainterAccesCount: number | null
    }
}

type Actions = {
    set: (playerCount: number) => void
    decreaseTotalMatchCount: (count: number) => void
    reset: () => void
}

