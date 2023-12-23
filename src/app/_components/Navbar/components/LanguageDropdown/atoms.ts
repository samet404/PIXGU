import { atom } from 'jotai';

export const isDropdownOpenAtom = atom<boolean>(false)
export const switchIsDropdownOpenAtom = atom(null, (get, set) => {
  set(isDropdownOpenAtom, !get(isDropdownOpenAtom))
})
