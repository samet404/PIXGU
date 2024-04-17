import { type RouterOutputs } from '@/trpc/shared'
import { atom } from 'jotai'

type Rgba = {
  r: number
  g: number
  b: number
  a: number
}

export const canvasColorAtom = atom<Rgba>({
  r: 50,
  g: 0,
  b: 150,
  a: 0.2,
})

export const startedDrawAtom = atom<number>(0)

export const isGridOpenAtom = atom<boolean>(true)

export const canvasPenThicknessAtom = atom<number>(5)

export const roomIDAtom = atom<string | null>(null)

export const userIDAtom = atom<string | null>(null)

export const playersAtom = atom<
  RouterOutputs['gameRoom']['getPlayingRoomUsers']
>([])
