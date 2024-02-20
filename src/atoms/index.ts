import { atom } from 'jotai'

export const readSearchParamsAtom = atom<Record<string, string> | null>(null)

export const setSearchParamsAtom = atom(null, (get, set) => {
  const prevParams = get(readSearchParamsAtom)
  const urlSearchParams = new URLSearchParams(window.location.search)
  const newParams = Object.fromEntries(urlSearchParams.entries())

  if (newParams != prevParams) set(readSearchParamsAtom, newParams)
})