import { CanvasesDataContext } from '@/context/client'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { getElementByID } from '@/utils'
import { useContext } from 'react'

export const useMouseOut = () => {
  const canvasData = useContext(CanvasesDataContext)!

  const handler = () => {
    if (!canvasData.painter.isPainter) return null

    canvasData.painter.painting = false

    const dctx = canvasData.draft!.getContext('2d')!
    dctx.beginPath()
  }

  useEffectOnce(() => {
    if (!canvasData.draft)
      canvasData.draft = getElementByID<HTMLCanvasElement>('draft-canvas')

    canvasData.draft.addEventListener('mouseout', handler)

    return () => {
      canvasData.draft.removeEventListener('mouseout', handler)
    }
  })
}
