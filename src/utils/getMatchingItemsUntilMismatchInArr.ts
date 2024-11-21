/**
 * This function takes an array and a compared set and returns the matching items until the first mismatch.
 * 
 * @example
 * getMatchingItemsUntilMismatchInArr([1, 2, 3, 4, 5], [1, 2, 3, 4, 6]) // [1, 2, 3, 4]
 */
export const getMatchingItemsUntilMismatchInArr = (arr: any[], comparedSet: Set<any>) => {
    const result = []

    for (let i = 0; i < arr.length; i++) {
        if (!comparedSet.has(arr[i])) break
        result.push(arr[i]);
    }

    return result
}