type Entry<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T]

/**
 * Filter an object by its entries
 *
 * const user = { name: "John", age: 93, height: 241 }
 *
 * const onlyJohns = filterObject(user, ([k, v]) => v === "John")
 */
export const filterObj = <T extends object>(
  obj: T,
  // eslint-disable-next-line no-unused-vars
  fn: (entry: Entry<T>, i: number, arr: Entry<T>[]) => boolean,
) => {
  return Object.fromEntries(
    (Object.entries(obj) as Entry<T>[]).filter(fn),
  ) as Partial<T>
}
