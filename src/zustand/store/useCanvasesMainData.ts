import { grayLog } from '@/utils/grayLog'
import { create } from 'zustand'

export type CanvasesMainData = {
  readonly cellSideCount: number
  cellPixelLength?: number

  draft?: HTMLCanvasElement
  main?: HTMLCanvasElement
  grid?: HTMLCanvasElement

  isGridsInitialized?: boolean
  isMainAndDraftInitialized?: boolean
}

type State = CanvasesMainData

type Action = {
  add: (data: Partial<CanvasesMainData>) => void
  get: () => CanvasesMainData
  reset: () => void
}

const initValue = {
  cellSideCount: 40,
  isGridsInitialized: false,
  isMainAndDraftInitialized: false,
} as const

export const useCanvasesMainData = create<State & Action>((set, get) => ({
  ...initValue,

  get: () => get(),
  add: (newInput) => {
    set({
      ...get(),
      ...newInput,
    })

    const {
      draft,
      main,
      cellSideCount,
      cellPixelLength,
      grid,
      isGridsInitialized,
      isMainAndDraftInitialized,
    } = get()

    if (!isMainAndDraftInitialized && draft && main) {
      const draftCanvasW = draft.width
      const draftCanvasH = draft.height

      get().cellPixelLength = draftCanvasW / cellSideCount

      const mctx = main.getContext('2d')!

      mctx.beginPath()
      mctx.fillStyle = '#ffffff'
      mctx.fillRect(0, 0, draftCanvasW, draftCanvasH)
      mctx.beginPath()

      grayLog('Draft and Main canvas initialized')
      set({
        ...get(),
        isMainAndDraftInitialized: true,
      })
    }

    if (!isGridsInitialized && grid) {
      if (!cellPixelLength) get().cellPixelLength = grid.width / cellSideCount
      const newCellPixelLength = get().cellPixelLength!

      const gridCanvasWidth = grid.width
      const gctx = grid.getContext('2d')!

      for (let i = 1; newCellPixelLength * grid.width > i; i++) {
        gctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
        gctx.fillRect(0, newCellPixelLength * i, gridCanvasWidth, 1)
        gctx.fillRect(newCellPixelLength * i, 0, 1, gridCanvasWidth)
      }

      grayLog('Grid canvas initialized')
      set({
        ...get(),
        isGridsInitialized: true,
      })
    }
  },

  reset: () => set({ ...initValue }),
}))
