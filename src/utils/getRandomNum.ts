/**
 * Get a random number between min and max.
 */
export const getRandomNum = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min
