'use client'

import { useEffect, useRef } from 'react'

export const Download = () => {
  const linkRef = useRef<HTMLAnchorElement>()
  const mainCanvas = useRef<HTMLCanvasElement>()

  useEffect(() => {
    linkRef.current = document.createElement<'a'>('a')
    mainCanvas.current =
      document.querySelector<HTMLCanvasElement>('main-canvas')!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnClick = () => {
    const link = linkRef.current!
    const date = new Date()

    const year = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    const hour = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`
    const fileName = `${hour}_${year}`

    link.download = `${fileName}.png`
    link.href = mainCanvas.current!.toDataURL()
    link.click()
  }

  return <button onMouseDown={handleOnClick}>Download</button>
}
