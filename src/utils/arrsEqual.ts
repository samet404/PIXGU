export const arrsEqual = (a: any[], b: any[], dontCheckOrder = false) => {
    if (a === b) return true
    if (a == null || b == null) return false
    if (a.length !== b.length) return false

    if (dontCheckOrder) {
        // Create clones to avoid modifying original arrays
        const sortedA = [...a].sort()
        const sortedB = [...b].sort()

        for (let i = 0; i < sortedA.length; ++i) {
            if (sortedA[i] !== sortedB[i]) return false
        }
        return true
    }

    // Regular ordered comparison
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false
    }
    return true
}
