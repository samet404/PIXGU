import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ToolName =
  | 'pencil'
  | 'eraser'
  | 'bucket'
  | 'rectangle'
  | 'circle'
  | 'text'
  | 'eyedropper'

export type PainterToolState = {
  current: ToolName

  options: {
    pencil: {
      size: number
    }

    eraser: {
      size: number
    }

    bucket: {
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

  with: {
    grid: boolean
    color: {
      r: number
      g: number
      b: number
      a: number
    }
  }
}

type Action = {
  setCurrent: (input: PainterToolState['current']) => void
  switchGrid: () => void
  setRGBA: (input: { r: number; g: number; b: number; a: number }) => void
}

const initState: PainterToolState = {
  current: 'pencil',
  options: {
    pencil: {
      size: 1,
    },
    eraser: {
      size: 1,
    },
    bucket: {
      size: 1,
    },
    rectangle: {
      width: 1,
      height: 1,
    },
    circle: {
      radius: 1,
    },
    text: {
      text: 'text',
      fontSize: 1,
    },
  },

  with: {
    grid: false,
    color: {
      r: 0,
      g: 0,
      b: 0,
      a: 0.5,
    },
  },
}

export const usePainterTool = create(
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
    }),
    { name: 'painterTool' },
  ),
)
