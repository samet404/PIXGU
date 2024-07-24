/**
 * Get the next two element index in an array with a given index
 * if next element does not exist, returns the first element index
 */
export const getNext2ArrElmI = <ArrT extends any[]>(arr: ArrT, i: number) => {
  let firstI: number | null = null
  let secondI: number | null = null

  if (arr.length - 1 < i) console.error('Given index is not exits.')
  else if (arr.length - 1 > i + 1) {
    firstI = i + 1
    secondI = i + 2
  } else if (arr.length - 1 >= i + 1) {
    firstI = i + 1
    secondI = 0
  } else if (arr.length - 1 <= i + 1) {
    firstI = 0
    secondI = 1
  }

  return {
    firstI,
    secondI,
  }
}
