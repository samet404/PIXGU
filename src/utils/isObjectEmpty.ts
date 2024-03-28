export const isObjectEmpty = (obj: object | undefined | null) => {
  if (!obj) return true

  return Object.keys(obj).length === 0
}
