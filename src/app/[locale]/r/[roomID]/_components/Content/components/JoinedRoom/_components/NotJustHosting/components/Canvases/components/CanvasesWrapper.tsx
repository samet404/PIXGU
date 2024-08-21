'use client'

import { useRef, type PropsWithChildren } from 'react'
import { useEffectOnce } from 'usehooks-ts'

export const CanvasesWrapper = ({ children }: PropsWithChildren) => {
  const divRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef(document.body)

  const getSize = () => `${bodyRef.current.offsetWidth * 0.018}rem`
  const setHeightAndWidth = () => {
    if (!divRef.current) return

    divRef.current.style.width = getSize()
    divRef.current.style.height = getSize()
  }

  useEffectOnce(() => {
    if (!divRef.current) return

    setHeightAndWidth()

    window.addEventListener('resize', () => setHeightAndWidth())
    return () => {
      window.removeEventListener('resize', () => setHeightAndWidth())
    }
  })

  return (
    <div
      ref={divRef}
      className="relative flex size-[50rem] cursor-crosshair rounded-md"
    >
      {children}
    </div>
  )
}
