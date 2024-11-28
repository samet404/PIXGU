import { atom } from 'jotai'

export const inputInfoTextAtom = atom<
  'You reached maximum length ✨' | 'Looks good ✨' | null
>(null)

export const isPublicAtom = atom<boolean>(true)
