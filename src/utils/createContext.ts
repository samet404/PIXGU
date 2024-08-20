/**
 * Create a custom context
 */

export const createContext = <T>(
  initialValue: T,
  config?: {
    runAfterSets?: (container: T) => void
    immutableValues: boolean
  },
): [
  () => T,
  (
    next: T,
    setterConfig?: {
      immutable: boolean
    },
  ) => Promise<void>,
] => {
  let objDefineReadonlyFunc: ObjDefineReadonly | undefined

  const container: Container = {}

  ;(async () => {
    if (initialValue)
      if (config?.immutableValues) {
        if (!objDefineReadonlyFunc) {
          const func = (async () =>
            (await import('./objDefineReadonly')).objDefineReadonly)()

          objDefineReadonlyFunc = await func

          objDefineReadonlyFunc(container, 'current', initialValue)
        } else if (objDefineReadonlyFunc)
          objDefineReadonlyFunc(container, 'current', initialValue)
      } else if (!config?.immutableValues) {
        container.current = initialValue
      }
  })()

  const get = function () {
    return container.current as T
  }
  const set = async function (next: T, setterConfig?: { immutable: boolean }) {
    if (config?.immutableValues || setterConfig?.immutable)
      if (!objDefineReadonlyFunc) {
        objDefineReadonlyFunc = (await import('./objDefineReadonly'))
          .objDefineReadonly

        objDefineReadonlyFunc(container, 'current', next)
      }

    container.current = next

    if (config?.runAfterSets) config.runAfterSets(container.current)
  }

  return [get, set]
}

type Container = {
  current?: any
}

type ObjDefineReadonly = (
  obj: Record<any, any>,
  key: string,
  value: any,
) => void
