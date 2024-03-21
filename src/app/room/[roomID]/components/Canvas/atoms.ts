import { type drawData } from '@/types/drawData'
import { atom } from 'jotai'

export const infoAtom = atom<drawData | null>(null)
