import { create } from 'zustand'

export type CanvasesMainData = {
  readonly cellSideCount: number
  cellPixelLength?: number

  draft_pencil?: HTMLCanvasElement
  draft_bucket?: HTMLCanvasElement

  main?: HTMLCanvasElement
  grid?: HTMLCanvasElement

  mctx?: CanvasRenderingContext2D
  dpctx?: CanvasRenderingContext2D
  dbctx?: CanvasRenderingContext2D
  gctx?: CanvasRenderingContext2D

  isGridsInitialized?: boolean
  zoom: number
}

type State = CanvasesMainData

type Action = {
  add: (data: Omit<Partial<CanvasesMainData>, 'cellSideCount'>) => void
  get: () => CanvasesMainData
  reset: () => void
}

const initValue = {
  cellSideCount: 80,
  isGridsInitialized: false,
  zoom: 0.5,
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
