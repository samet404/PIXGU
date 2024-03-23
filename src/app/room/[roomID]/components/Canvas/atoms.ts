import { type drawData } from '@/types/drawData'
import { atom } from 'jotai'

export const infoAtom = atom<drawData | null>(null)

export const cellSideCountAtom = atom<number>(30)
export const isGridOpenAtom = atom<boolean>(true)
