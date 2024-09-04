/**
@example
calculatePercentage(25, 100) // 25
calculatePercentage(75, 200) // 37.5
 */
export const calcPercentage = (value: number, total: number) =>
  (total * value) / 100
