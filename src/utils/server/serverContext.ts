import 'server-only'
import React from 'react'

/**
 * This function creates a server component only context.
 */
export const serverContext = <T>(
  defaultValue: T,
): [() => T, (value: T) => void] => {
  const getRef = (0, React.cache)(() => {
    return { current: defaultValue }
  })

  const getValue = () => getRef().current
  const setValue = (value: T) => {
    getRef().current = value
  }

  return [getValue, setValue]
}
