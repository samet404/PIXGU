/**
 * Check if an object is empty
 * @param obj - The object to check
 */
export const isObjectEmpty = (obj: object | undefined | null) => {
  if (!obj) return true

  return Object.keys(obj).length === 0
}
