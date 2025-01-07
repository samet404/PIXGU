import { atom } from 'jotai'

export const isGridOpenAtom = atom<boolean>(false)

export const openPanelAtom = atom<'marketplace' | 'power-ups' | null>(null)

export const isCanvasToolsOpenAtom = atom<boolean>(false)
export const isCanvasToolsPinnedAtom = atom<boolean>(false)