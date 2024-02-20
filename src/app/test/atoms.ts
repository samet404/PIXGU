import { atom } from 'jotai'

export const searchParamsAtom = atom<Record<string, string> | null>(null)

export const readSearchParamsAtom = atom<Record<string, string> | null>((get) =>
  get(searchParamsAtom),
)

export const searchParamColorAtom = atom<string | null>(null)

export const setSearchParamsAtom = atom(null, (get, set) => {
  const prevParams = get(readSearchParamsAtom)
  const urlSearchParams = new URLSearchParams(window.location.search)
  const newParams = Object.fromEntries(urlSearchParams.entries())

  if (newParams != prevParams) set(searchParamsAtom, newParams)

  const newColorParam = newParams.color

  if (newColorParam) {
    const colorState = get(searchParamColorAtom)

    if (newColorParam != colorState) set(searchParamColorAtom, newColorParam)
  }
})
