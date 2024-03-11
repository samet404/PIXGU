import { useEffect } from 'react'
import { getSearchParam } from '@/src/utils/getSearchParam'

export const useCanvasDraw = () => {
  let painting = false

  // Draw functions
  const mouseOut = () => {
    console.log('mouseOut')
    const draftCanvas = document.getElementById(
      'draftCanvas',
    ) as HTMLCanvasElement
    const ctx = draftCanvas.getContext('2d')

    painting = false
    ctx?.beginPath()
  }

  const startPosition = (e: any) => {
    const mainCanvas = document.getElementById(
      'mainCanvas',
    ) as HTMLCanvasElement
    const mctx = mainCanvas.getContext('2d')!

    const draftCanvas = document.getElementById(
      'draftCanvas',
    ) as HTMLCanvasElement

    const canvasColor = (getSearchParam('color') ??
      '0-0-0-1)') as `${string}-${string}-${string}-${string}`
    const opacity = canvasColor.split('-')[3]

    const canvasThickness = getSearchParam('thickness') ?? '5'

    if (e.target != draftCanvas) return null

    draftCanvas.style.opacity = `${opacity ?? '1'}`
    mctx.globalAlpha = parseFloat(opacity ?? '1')

    const rect = draftCanvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const dctx = draftCanvas.getContext('2d')!

    painting = true
    dctx.lineWidth = parseFloat(canvasThickness)
    dctx.lineCap = 'round'
    dctx.lineTo(x, y)
    dctx.stroke()
    dctx.moveTo(x, y)
  }

  const finishedPosition = () => {
    const draftCanvas = document.getElementById(
      'draftCanvas',
    ) as HTMLCanvasElement

    const mainCanvas = document.getElementById(
      'mainCanvas',
    ) as HTMLCanvasElement

    const dctx = draftCanvas.getContext('2d')!
    const mctx = mainCanvas.getContext('2d')!

    dctx.beginPath()

    painting = false

    const a = draftCanvas

    console.log(a)

    mctx.drawImage(draftCanvas, 0, 0) // copy drawing to main
    dctx.clearRect(0, 0, draftCanvas.width, draftCanvas.height) // clear draft

    console.log('finishedPosition')
  }

  const draw = (e: any) => {
    if (!painting) return null

    const canvasColor = (getSearchParam('color') ??
      '0-0-0-1') as `${string}-${string}-${string}-${string}`

    const rgb = canvasColor.split('-')
    const r = rgb[0] ?? '0'
    const g = rgb[1] ?? '0'
    const b = rgb[2] ?? '0'

    const canvasThickness = getSearchParam('thickness') ?? '5'

    const draftCanvas = document.getElementById(
      'draftCanvas',
    ) as HTMLCanvasElement

    if (e.target != draftCanvas) {
      painting = false
      return null
    }

    const rect = draftCanvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const dctx = draftCanvas.getContext('2d')!

    dctx.lineWidth = parseFloat(canvasThickness)
    dctx.lineCap = 'round'
    dctx.lineTo(x, y)
    dctx.strokeStyle = `rgb(${r}, ${g}, ${b})`
    dctx.stroke()
    dctx.beginPath() // Add this line to start a new path
    dctx.moveTo(x, y)
  }

  useEffect(() => {
    const draftCanvas = document.getElementById(
      'draftCanvas',
    ) as HTMLCanvasElement

    draftCanvas.addEventListener('mousedown', startPosition)
    draftCanvas.addEventListener('mouseup', finishedPosition)
    draftCanvas.addEventListener('mousemove', draw)
    draftCanvas.addEventListener('mouseout', mouseOut)

    return () => {
      draftCanvas.removeEventListener('mousedown', startPosition)
      draftCanvas.removeEventListener('mouseup', finishedPosition)
      draftCanvas.removeEventListener('mousemove', draw)
      draftCanvas.removeEventListener('mouseout', mouseOut)
    }
  })
}
