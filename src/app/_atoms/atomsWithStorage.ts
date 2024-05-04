import { atomWithStorage } from 'jotai/utils'

export const themeAtom = atomWithStorage<string>('theme', 'default')

export const languageAtom = atomWithStorage<string>('language', 'EN')

export const musicAtom = atomWithStorage<boolean | null>('music', null)
