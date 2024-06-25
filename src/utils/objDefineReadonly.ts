/**
 * Define a readonly property on an object
 */
export const objDefineReadonly = (
  obj: Record<any, any>,
  key: string,
  value: any,
) => {
  Object.defineProperty(obj, key, {
    value,
    writable: false,
    enumerable: true,
    configurable: false,
  })
}
