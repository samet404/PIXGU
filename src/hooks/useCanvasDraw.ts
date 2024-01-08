import { type RefObject } from 'react'

export const useCanvasDraw = (
  draftCanvasRef: RefObject<HTMLCanvasElement>,
  mainCanvasRef: RefObject<HTMLCanvasElement>,
  canvasColor: {
    r: number
    g: number
    b: number
    a: number
  },
) => {
  let painting = false

  // Draw functions

  const mouseOut = () => {
    console.log('mouseOut')
    const draftCanvas = draftCanvasRef.current
    const ctx = draftCanvas!.getContext('2d')

    painting = false
    ctx?.beginPath()
  }

  const startPosition = (e: React.MouseEvent<HTMLCanvasElement>) => {
    console.log('startPosition')

    const mainCanvas = mainCanvasRef.current!
    const draftCanvas = draftCanvasRef.current!
    if (e.target != draftCanvas) return null

    const mctx = mainCanvas.getContext('2d')!

    draftCanvas.style.opacity = `${canvasColor.a}`
    mctx.globalAlpha = canvasColor.a

    const rect = draftCanvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const dctx = draftCanvas.getContext('2d')!

    painting = true
    dctx.lineWidth = 5
    dctx.lineCap = 'round'
    dctx.lineTo(x, y)
    dctx.stroke()
    dctx.moveTo(x, y)
  }

  const finishedPosition = () => {
    const draft = draftCanvasRef.current!

    const dctx = draftCanvasRef.current!.getContext('2d')!
    const mctx = mainCanvasRef.current!.getContext('2d')!

    dctx.beginPath()

    painting = false

    mctx.drawImage(draft, 0, 0) // copy drawing to main
    dctx.clearRect(0, 0, draft.width, draft.height) // clear draft

    console.log('finishedPosition')
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!painting) return null
    if (e.target != draftCanvasRef.current) {
      painting = false
      return null
    }

    const draftCanvas = draftCanvasRef.current

    const rect = draftCanvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const dctx = draftCanvas.getContext('2d')!

    dctx.lineWidth = 5
    dctx.lineCap = 'round'
    dctx.lineTo(x, y)
    dctx.strokeStyle = `rgb(${canvasColor.r}, ${canvasColor.g}, ${canvasColor.b})`
    dctx.stroke()
    dctx.beginPath() // Add this line to start a new path
    dctx.moveTo(x, y)
  }

  // Event handlers
  return {
    mouseDown: startPosition,
    mouseUp: finishedPosition,
    mouseMove: draw,
    mouseOut,
  }
}
