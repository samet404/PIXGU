import { draw } from './func'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useCanvasesMainData, usePainterData } from '@/zustand/store'

export const useMouseDown = (myUserID: string) => {
  const handler = (e: MouseEvent) => {
    console.log('startPosition')
    const painterData = usePainterData.getState().get()
    const setPainterData = usePainterData.getState().add

    if (!painterData?.amIPainter) return null
    if (e.button !== 0) return null

    setPainterData({
      ...painterData,
      amIPainting: true,
    })
    draw(e, myUserID)
  }

  useEffectOnce(() => {
    const canvasesMainData = useCanvasesMainData.getState().get()

    if (!canvasesMainData.draft) {
      return
    }

    canvasesMainData.draft.addEventListener('mousedown', handler)

    return () => {
      canvasesMainData.draft!.removeEventListener('mousedown', handler)
    }
  })
}
