'use client'

import { useEffect, useRef } from 'react'

const Download = () => {
  const linkRef = useRef<HTMLAnchorElement>()
  const date = new Date()

  useEffect(() => {
    linkRef.current = document.createElement('a')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnClick = () => {
    const year = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    const hour = `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getMilliseconds()}`
    const fileName = `${hour}_${year}`

    linkRef.current!.download = `${fileName}.png`

    linkRef.current!.href = (
      document.getElementById('main-canvas')! as HTMLCanvasElement
    ).toDataURL()

    linkRef.current?.click()
  }

  return <button onClick={handleOnClick}>Download</button>
}
export default Download
