import { atom } from 'jotai'

export const roomPasswordAtom = atom<string | null>(null)
export const roomNeedsPassword = atom<boolean | null>(null)