/**
 * A type that makes all properties of an object null and undefined
 */
export type NullishObject<T> = {
  [K in keyof T]: T[K] | null | undefined
}
