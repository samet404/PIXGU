import { atom } from 'jotai';

export const recordingAtom = atom<{
    key: string
    value: string[]
} | null>(null)

export const alertAtom = atom<{
    type: 'error' | 'warning'
    text: string
} | null>(null)