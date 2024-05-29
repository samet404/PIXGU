import { useEffectOnce } from 'usehooks-ts'
import { addGrid } from './func/addGrid'
import { useContext } from 'react'
import { CanvasesDataContext } from '@/context/client'
import { getElementByID } from '@/utils'

export const useInitCanvasData = () => {
  const canvasData = useContext(CanvasesDataContext)!

  useEffectOnce(() => {
    if (!canvasData.draft)
      canvasData.draft = getElementByID<HTMLCanvasElement>('draft-canvas')

    const draftCanvasW = canvasData.draft.width
    const draftCanvasH = canvasData.draft.height

    canvasData.cellPixelLength = draftCanvasW / canvasData.cellSideCount

    const mctx = canvasData.main!.getContext('2d')!

    mctx.beginPath()
    mctx.fillStyle = 'white'
    mctx.fillRect(0, 0, draftCanvasW, draftCanvasH)
    mctx.beginPath()

    addGrid(canvasData.cellPixelLength)
  })
}
