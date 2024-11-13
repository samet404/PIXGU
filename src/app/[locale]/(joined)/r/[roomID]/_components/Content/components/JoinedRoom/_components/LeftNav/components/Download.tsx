'use client'

import { useCanvasesMainData, useGameToolAlert } from '@/zustand/store'
import Image from 'next/image'
import { Fragment, useEffect, useRef } from 'react'
import img from '@/svg/download-svgrepo-com.svg'
import { Button } from './Button'
import { UseShortcut } from '@/components/UseShortcut'

export const Download = () => {
  const linkRef = useRef<HTMLAnchorElement>()
  const setToolAlert = useGameToolAlert((s) => s.setAlert)

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
        key={'download'}
        onMouseDown={download}
        className="size-9 rounded-lg bg-[#ffffff4a] p-1"
        icon={<Image src={img} alt="download" className="opacity-60" />}
      />

      <UseShortcut keyName='Download' onShortcut={() => {
        download()
        setToolAlert('Download selected')
      }} />
    </Fragment>
  )
}
