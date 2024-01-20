import { atom } from 'jotai'

export const minPlayerNumberAtom = atom<number>(2)
export const maxPlayerNumberAtom = atom<number>(2)

export const passwordAtom = atom<string>('')