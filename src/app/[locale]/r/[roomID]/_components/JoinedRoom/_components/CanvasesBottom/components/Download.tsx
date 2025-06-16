'use client'

import { Svg } from '@/components/Svg'
import { useCanvasesMainData } from '@/zustand/store/useCanvasesMainData'
import { useEffect, useRef } from 'react'

export const Download = () => {
  const linkRef = useRef<HTMLAnchorElement>()

  useEffect(() => {
    linkRef.current = document.createElement<'a'>('a')
    document.querySelector<HTMLCanvasElement>('main-canvas')!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnClick = () => {
    const mainCanvas = useCanvasesMainData.getState().main
    if (!mainCanvas) return

    const link = linkRef.current!
    const date = new Date()

    const year = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    const hour = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`
    const fileName = `${hour}_${year}`

    link.download = `${fileName}.png`
    link.href = mainCanvas.toDataURL()
    link.click()
  }

  return (
    <button
      onMouseDown={handleOnClick}
      className="size-9 rounded-lg bg-[#ffffff4a] p-1"
    >
      <Svg src='download-svgrepo-com.svg' alt="download" className="opacity-60" />
    </button>
  )
}
