import { type drawData } from '@/types/drawData'
import { atom } from 'jotai'
import { type PixelPerDraw } from './types'

export const infoAtom = atom<drawData | null>(null)

export const cellSideCountAtom = atom<number>(30)

export const isPixelPerSecondExceededAtom = atom<boolean>(false)
export const pixelPerDrawAtom = atom<PixelPerDraw | null>(null)
export const isDrawingAtom = atom<boolean>(false)
