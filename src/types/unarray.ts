/**
 * Extracts the type of the first element of an array type.
 */
export type Unarray<T> = T extends Array<infer U> ? U : T
