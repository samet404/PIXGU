import { useEffect } from 'react'
import { getSearchParam } from '@/src/utils/getSearchParam'

export const useCanvasDraw = () => {
  let painting = false
  let canvasColor: `${string}-${string}-${string}-${string}`
  let r: string
  let g: string
  let b: string
  let opacity: string
  let canvasThickness: string

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

    canvasColor = (getSearchParam('color') ??
      '0-0-0-1)') as `${string}-${string}-${string}-${string}`
    opacity = canvasColor.split('-')[3] ?? '1'
    canvasThickness = getSearchParam('thickness') ?? '5'

    const canvasColorSplit = canvasColor.split('-')
    r = canvasColorSplit[0] ?? '0'
    g = canvasColorSplit[1] ?? '0'
    b = canvasColorSplit[2] ?? '0'

    if (e.target != draftCanvas) return null

    draftCanvas.style.opacity = `${opacity ?? '1'}`
    mctx.globalAlpha = parseFloat(opacity ?? '1')

    const rect = draftCanvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const dctx = draftCanvas.getContext('2d')!
    console.log(canvasColor)
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

    mctx.drawImage(draftCanvas, 0, 0) // copy drawing to main
    dctx.clearRect(0, 0, draftCanvas.width, draftCanvas.height) // clear draft
    console.log(draftCanvas)
    console.log('finishedPosition')
  }

  const draw = (e: any) => {
    if (!painting) return null

    const draftCanvas = document.getElementById(
      'draftCanvas',
    ) as HTMLCanvasElement

    // If mouse is not on the draft canvas, stop drawing and exit
    if (e.target != draftCanvas) {
      painting = false
      return null
    }

    // Get mouse position
    const rect = draftCanvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const dctx = draftCanvas.getContext('2d')!

    // Draw line
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
