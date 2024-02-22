export const getSearchParam = (key: string) => {
  const url = new URL(window.location.href)
  
  return url.searchParams.get(key)
}
