// Solution of "Property 'X' does not exist on type 'Window & typeof globalThis'" error.
// more info: https://www.totaltypescript.com/how-to-properly-type-window

// eslint-disable-next-line no-unused-vars
interface Window {
  X: number
  opera: string
}
