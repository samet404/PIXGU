import { atom } from 'jotai'

export const yesNoAtom = atom<'yes' | 'no'>('no')
