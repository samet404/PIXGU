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
    color: [0, 0, 0, 0.5],
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

        setRGBA: (input) =>
          set({
            ...get(),
            with: {
              ...get().with,
              color: input,
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
        }
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
    color: [
      r: number,
      g: number,
      b: number,
      a: number
    ]
  }
}

type Action = {
  setCurrent: (input: PainterToolState['current']) => void
  switchGrid: () => void
  setRGBA: (input: [
    r: number,
    g: number,
    b: number,
    a: number
  ]) => void;
  increaseSize: (tool: ToolHaveSizeProperty) => void
  decreaseSize: (tool: ToolHaveSizeProperty) => void
}

