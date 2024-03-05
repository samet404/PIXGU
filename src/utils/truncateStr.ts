export const truncateStr = (str: string, maxLength: number) => {
  const length = str.length
  if (length <= maxLength) str

  return str.substring(0, maxLength) + '...'
}
