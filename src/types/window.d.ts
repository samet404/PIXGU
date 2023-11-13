// Solution of "Property 'X' does not exist on type 'Window & typeof globalThis'" error.
// more info: https://www.totaltypescript.com/how-to-properly-type-window

interface Window {
  X: number
  opera: string
}