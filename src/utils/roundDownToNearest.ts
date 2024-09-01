/*
  Rounds a number down to the nearest multiple of a given step.
  For example, roundDownToNearest(15, 10) returns 10, and roundDownToNearest(21, 10) returns 20.
*/
export const roundDownToNearest = (num: number, step: number) =>
  Math.floor(num / step) * step
