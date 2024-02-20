/**
 * @link https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
 */
export const replaceState = (
  url: string,
  doSomething: () => void,
  state?: object,
) => {
  window.history.replaceState(state ? state : null, '', url)

  doSomething()
}

/*
  JOTAI ATOMS EXAMPLE 

  export const searchParamsAtom = atom<Record<string, string> | null>(null)

  export const readSearchParamsAtom = atom<Record<string, string> | null>((get) =>
    get(searchParamsAtom),
  )

  export const setSearchParamsAtom = atom(null, (get, set) => {
    const prevParams = get(readSearchParamsAtom)
    const urlSearchParams = new URLSearchParams(window.location.search)
    const newParams = Object.fromEntries(urlSearchParams.entries())

    if (newParams != prevParams) set(searchParamsAtom, newParams)
  })
*/
