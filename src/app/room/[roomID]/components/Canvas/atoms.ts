import { type drawData } from '@/types/drawData'
import { atom } from 'jotai'

export const infoAtom = atom<drawData | null>(null)

export const cellSideCountAtom = atom<number>(30)

export const isPixelPerSecondExceededAtom = atom<boolean>(false)
export const pixelPerSecondAtom = atom<number>(0)
