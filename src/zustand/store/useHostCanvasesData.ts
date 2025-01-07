import { create } from 'zustand'

export type HostCanvasesData = {
    readonly cellSideCount: number
    cellPixelLength?: number

    main?: HTMLCanvasElement
    mctx?: CanvasRenderingContext2D
}

type State = HostCanvasesData

type Action = {
    add: (data: Omit<Partial<State>, 'cellSideCount'>) => void
    get: () => State
    reset: () => void
}

const initValue: State = {
    cellSideCount: 120,
} as const

export const useHostCanvasesData = create<State & Action>((set, get) => ({
    ...initValue,

    get: () => get(),
    add: (newInput) => {
        set({
            ...get(),
            ...newInput,
        })
    },

    reset: () => set({ ...initValue }),
}))
