export const setSearchParam = (key: string, value: string) => {
  const url = new URL(window.location.href)
  
  url.searchParams.set(key, value)
  window.history.replaceState(null, '', url.toString())
}
