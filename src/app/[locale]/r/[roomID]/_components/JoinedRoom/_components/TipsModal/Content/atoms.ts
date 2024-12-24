import { atom } from 'jotai'

export const currentSectionIndexAtom = atom<number>(1)
export const showTipsModalAtom = atom<boolean>(false)
export const isLoadingAtom = atom<{
    1: boolean
    2: boolean
    3: boolean
}>({
    1: true,
    2: true,
    3: true,
})