'use client'

import { useAtomValue } from 'jotai'
import { textAtom } from '../atoms'
import { useLayoutEffect } from 'react'

export const Buttons = () => {
  const text = useAtomValue(textAtom)
  useLayoutEffect(() => {
    const startTime = Date.now()

    return () => {
      const endTime = Date.now()
      const timeRendered = endTime - startTime
      console.log(timeRendered) // Expect this to be a positive number
    }
  }, [])

  return new Array(40000).fill(text).map((t, i) => (
    <button className="flex bg-green-400 p-2" key={i}>
      {t}
    </button>
  ))
}
