import { useEffect } from 'react'

/**
 * Add event listener to window
 
useBodyEventListener(eventName: string,
 * handler: (e?: any) => void,
 * options?: boolean | AddEventListenerOptions)
 */
export const useWindowEventListener = (
  eventName: string,
  // eslint-disable-next-line no-unused-vars
  handler: (e?: any) => void,
  options?: boolean | AddEventListenerOptions,
) => {
  useEffect(() => {
    if (window) window.addEventListener(eventName, handler, options)

    if (window)
      return () => {
        window.removeEventListener(eventName, handler, options)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
