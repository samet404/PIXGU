import { CanvasesDataContext } from '@/context/client'
import { useEventListener } from '@/hooks'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { getElementByID } from '@/utils/getElementByID'
import { useContext } from 'react'

export const useMouseUp = () => {
  const canvasData = useContext(CanvasesDataContext)!

  const handler = () => {
    if (!canvasData.painter.isPainter) return null

    const dCanvas = canvasData.draft!
    const mCanvas = canvasData.main!
    const dctx = dCanvas.getContext('2d')!
    const mctx = mCanvas.getContext('2d')!

    canvasData.painter.painting = false

    mctx.drawImage(dCanvas, 0, 0) // copy drawing to main
    dctx.clearRect(0, 0, dCanvas.width, dCanvas.height) // clear draft
  }

  useEffectOnce(() => {
    if (!canvasData.draft)
      canvasData.draft = getElementByID<HTMLCanvasElement>('draft-canvas')

    canvasData.draft.addEventListener('mouseup', handler)

    return () => {
      canvasData.draft!.removeEventListener('mouseup', handler)
    }
  })
}
