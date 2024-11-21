const editDistance = (str1: string, str2: string): number => {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();

    const costs = new Array();
    for (let i = 0; i <= str1.length; i++) {
        let lastValue = i;
        for (let j = 0; j <= str2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    let newValue = costs[j - 1];
                    if (str1.charAt(i - 1) != str2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[str2.length] = lastValue;
    }
    return costs[str2.length];
}

/**
 * Calculates the similarity between two strings.
 * The similarity is calculated as the Levenshtein distance between the two strings.
 * 
 * @example
 * strSimilarity('hello', 'hallo')
 */
export const strSimilarity = (str1: string, str2: string) => {
    let longer = str1;
    let shorter = str2;
    if (str1.length < str2.length) {
        longer = str2;
        shorter = str1;
    }
    const longerLength = longer.length;
    if (longerLength == 0) return 1.0

    return (longerLength - editDistance(longer, shorter)) / longerLength
}
