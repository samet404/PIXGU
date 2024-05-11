import { atom } from 'jotai'
import type { objRGBA } from '@/types'

export const canvasColorAtom = atom<objRGBA>({
  r: 50,
  g: 0,
  b: 150,
  a: 0.2,
})

export const startedDrawAtom = atom<number>(0)

export const isGridOpenAtom = atom<boolean>(true)

export const canvasPenThicknessAtom = atom<number>(5)
