import { useEffect } from 'react'
import { canvasColorAtom, canvasPenThicknessAtom } from '../atoms'
import { useAtomValue } from 'jotai'

export const useCanvasDraw = () => {
  const canvasPenThickness = useAtomValue(canvasPenThicknessAtom)
  const canvasColor = useAtomValue(canvasColorAtom)
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
    console.log('startPosition')

    const mainCanvas = document.getElementById(
      'mainCanvas',
    ) as HTMLCanvasElement

    const draftCanvas = document.getElementById(
      'draftCanvas',
    ) as HTMLCanvasElement

    if (e.target != draftCanvas) return null

    const mctx = mainCanvas.getContext('2d')!

    draftCanvas.style.opacity = `${canvasColor.a}`
    mctx.globalAlpha = canvasColor.a

    const rect = draftCanvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const dctx = draftCanvas.getContext('2d')!

    painting = true
    dctx.lineWidth = canvasPenThickness
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

    console.log('finishedPosition')
  }

  const draw = (e: any) => {
    if (!painting) return null

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

    dctx.lineWidth = canvasPenThickness
    dctx.lineCap = 'round'
    dctx.lineTo(x, y)
    dctx.strokeStyle = `rgb(${canvasColor.r}, ${canvasColor.g}, ${canvasColor.b})`
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
