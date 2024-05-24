import type { CanvasDataRef } from '@/types'
import { useEffectOnce } from 'usehooks-ts'
import { addGrid } from './func/addGrid'

export const useInitCanvasData = ({ canvasDataRef }: Arg) => {
  useEffectOnce(() => {
    const draftCanvas = document.getElementById(
      `draft-canvas`,
    ) as HTMLCanvasElement
    canvasDataRef.current.draft = draftCanvas

    const mainCanvas = document.getElementById(
      `main-canvas`,
    ) as HTMLCanvasElement

    canvasDataRef.current.main = mainCanvas

    const draftCanvasW = draftCanvas.width
    const draftCanvasH = draftCanvas.height

    canvasDataRef.current.cellPixelLength =
      draftCanvasW / canvasDataRef.current.cellSideCount

    const mctx = mainCanvas.getContext('2d')!

    mctx.beginPath()
    mctx.fillStyle = 'white'
    mctx.fillRect(0, 0, draftCanvasW, draftCanvasH)
    mctx.beginPath()

    addGrid(canvasDataRef.current.cellPixelLength)
  })
}

type Arg = {
  canvasDataRef: CanvasDataRef
}
