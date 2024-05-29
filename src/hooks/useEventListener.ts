import type { SyntheticEvent } from 'react'
import { useEffectOnce } from './useEffectOnce'

/**
 * Add event listener to the element
 */
export const useEventListener = (
  element: HTMLElement | Document | Window,
  eventName: keyof HTMLElementEventMap,
  // eslint-disable-next-line no-unused-vars
  handler: (e?: any) => void,
  options?: boolean | AddEventListenerOptions,
) => {
  useEffectOnce(() => {
    element.addEventListener(eventName, handler, options)

    return () => element.removeEventListener(eventName, handler, options)
  })
}
