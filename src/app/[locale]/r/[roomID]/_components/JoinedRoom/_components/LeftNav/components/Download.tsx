'use client'

import { useCanvasesMainData } from '@/zustand/store/useCanvasesMainData'
import { Fragment, useEffect, useRef } from 'react'
import { Button } from './Button'
import { Svg } from '@/components/Svg'

export const Download = () => {
  const linkRef = useRef<HTMLAnchorElement>()

  useEffect(() => {
    linkRef.current = document.createElement<'a'>('a')
    document.querySelector<HTMLCanvasElement>('main-canvas')!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const download = () => {
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
    <Fragment>
      <Button
        shortcutName='Download'
        key={'download'}
        onMouseDown={download}
        className="hover:bg-[#ffffff45]"
        icon={<Svg src='download-svgrepo-com.svg' alt="download" className="h-full w-full opacity-40" />}
      />
    </Fragment>
  )
}
