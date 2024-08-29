import { atom } from 'jotai'

export const isGridOpenAtom = atom<boolean>(false)

export const openPanelAtom = atom<'marketplace' | 'players' | null>(null)
