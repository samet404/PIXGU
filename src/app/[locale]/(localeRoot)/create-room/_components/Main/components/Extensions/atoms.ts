import { atom } from 'jotai'

export const isModalOpenAtom = atom<boolean>(false)

export const switchModalAtom = atom(null, (get, set) =>
  set(isModalOpenAtom, (prev) => !prev),
)
