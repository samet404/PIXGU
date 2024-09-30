import { atom } from 'jotai'

export const inputInfoTextAtom = atom<
  'You reached maximum length ✨' | 'Good ✨' | null
>(null)

export const isPublicAtom = atom<boolean>(true)
