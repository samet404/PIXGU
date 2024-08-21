import type { InferArr } from '@/types'

/**
 * Get the next element index in an array with a given index
 * if next element does not exist, returns the first element index
 */
export const getNextArrElmI = <ArrT extends any[]>(
  arr: ArrT,
  i: number,
): {
  index: number
  value: InferArr<ArrT>
} => {
  if (i + 1 > arr.length - 1)
    return {
      index: 0,
      value: arr[0],
    }

  return {
    index: i + 1,
    value: arr[i + 1],
  }
}
