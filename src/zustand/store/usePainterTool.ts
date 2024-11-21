import { create } from 'zustand'
import { persist, subscribeWithSelector } from 'zustand/middleware'

export const toolsHaveSizeProperty = ['pencil', 'eraser']

const initState: PainterToolState = {
  current: 'pencil',
  options: {
    pencil: {
      size: 1,
    },
    eraser: {
      size: 1,
    },
    rectangle: {
      width: 10,
      height: 4,
    },
    circle: {
      radius: 3,
    },
    text: {
      text: 'text',
      fontSize: 16,
    },
  },

  with: {
    grid: false,
    color1: [0, 0, 0, 0.5],
    color2: [0, 0, 0, 1],
    selectedColor: 1,
    undoRedoType: 0
  },
}

export const usePainterTool = create(
  subscribeWithSelector(
    persist<PainterToolState & Action>(
      (set, get) => ({
        ...initState,

        setCurrent: (input) =>
          set({
            ...get(),
            current: input,
          }),

        setColor: (input) =>
          set({
            ...get(),
            with: {
              ...get().with,
              color1: input,
            },
          }),

        setColor2: (input) =>
          set({
            ...get(),
            with: {
              ...get().with,
              color2: input,
            },
          }),

        switchGrid: () =>
          set({
            ...get(),
            with: {
              ...get().with,
              grid: !get().with.grid,
            },
          }),

        increaseSize: (tool) => {
          if (get().options[tool].size === 20) return

          set({
            ...get(),
            options: {
              ...get().options,
              [tool]: {
                ...get().options[tool],
                size: get().options[tool].size + 1,
              },
            },
          })
        },

        decreaseSize: (tool) => {
          if (get().options[tool].size === 1) return

          set({
            ...get(),
            options: {
              ...get().options,
              [tool]: {
                ...get().options[tool],
                size: get().options[tool].size - 1,
              },
            },
          })
        },

        setUndoRedoType: (input) =>
          set({
            ...get(),
            with: {
              ...get().with,
              undoRedoType: input,
            },
          }),
      }),
      { name: 'painterTool' },
    )
  )
)

export type ToolHaveSizeProperty = 'pencil' | 'eraser'
export type ToolName =
  | 'pencil'
  | 'eraser'
  | 'bucket'
  | 'rectangle'
  | 'circle'
  | 'text'
  | 'eyedropper'
  | 'gradient'

type Options = {
  pencil: {
    size: number
  }

  eraser: {
    size: number
  }

  rectangle: {
    width: number
    height: number
  }

  circle: {
    radius: number
  }

  text: {
    text: string
    fontSize: number
  }
}

export type PainterToolState = {
  current: ToolName

  options: Options

  with: {
    grid: boolean
    color1: [
      r: number,
      g: number,
      b: number,
      a: number
    ]
    color2: [
      r: number,
      g: number,
      b: number,
      a: number
    ]
    selectedColor: 1

    undoRedoType: 0 | 1
  }
}

type Action = {
  setCurrent: (input: PainterToolState['current']) => void
  switchGrid: () => void
  setColor: (input: [
    r: number,
    g: number,
    b: number,
    a: number
  ]) => void;
  setColor2: (input: [
    r: number,
    g: number,
    b: number,
    a: number
  ]) => void;
  increaseSize: (tool: ToolHaveSizeProperty) => void
  decreaseSize: (tool: ToolHaveSizeProperty) => void
  setUndoRedoType: (input: PainterToolState['with']['undoRedoType']) => void
}

