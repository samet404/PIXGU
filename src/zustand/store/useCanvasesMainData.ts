import { create } from 'zustand'

export type CanvasesMainData = {
  readonly cellSideCount: number
  cellPixelLength?: number

  draft?: HTMLCanvasElement
  main?: HTMLCanvasElement
  grid?: HTMLCanvasElement

  isGridsInitialized?: boolean
}

type State = CanvasesMainData

type Action = {
  add: (data: Omit<Partial<CanvasesMainData>, 'cellSideCount'>) => void
  get: () => CanvasesMainData
  reset: () => void
}

const initValue = {
  cellSideCount: 40,
  isGridsInitialized: false,
} as const

export const useCanvasesMainData = create<State & Action>((set, get) => ({
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
