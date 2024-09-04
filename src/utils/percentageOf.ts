/**
 * Calculates the percentage of a number.
 * @param amount The amount to calculate the percentage of.
 * @param number The number to calculate the percentage of.
 *
 * @example
 * percentageOf(100, 100) // 100
 * percentageOf(100, 200) // 50
 */
export const percentageOf = (amount: number, number: number) =>
  (amount / number) * 100
