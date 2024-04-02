/**
 * A simple function, that simply takes in the amount
 * of milliseconds you wish to wait as a parameter.
 * We then immediately return a new Promise, which
 * is resolved when setTimeout completes. Code execution
 * is paused until the Promise is resolved.
 */
export const asyncTimeout = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
