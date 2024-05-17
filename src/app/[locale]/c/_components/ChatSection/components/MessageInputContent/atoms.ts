import { atom } from 'jotai'

export const isBtnSendGlowingAtom = atom<boolean>(false)

export const setIsBtnSendGlowingAtom = atom(
  null,
  (get, set, newVal: boolean) => {
    if (get(isBtnSendGlowingAtom) === newVal) return
    set(isBtnSendGlowingAtom, newVal)
  },
)
