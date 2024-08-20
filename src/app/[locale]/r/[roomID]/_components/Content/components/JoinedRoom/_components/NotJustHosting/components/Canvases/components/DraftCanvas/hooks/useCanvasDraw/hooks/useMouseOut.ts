import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useCanvasesMainData, usePainterData } from '@/zustand/store'

export const useMouseOut = () => {
  const handler = () => {
    console.log('mouse out')
    const canvasesMainData = useCanvasesMainData.getState().get()
    const painterData = usePainterData.getState().get()
    const setPainterData = usePainterData.getState().add

    if (!painterData?.amIPainter) return null

    setPainterData({
      ...painterData,
      amIPainting: false,
    })

    const dctx = canvasesMainData.draft!.getContext('2d')!
    dctx.beginPath()
  }

  useEffectOnce(() => {
    const { draft } = useCanvasesMainData.getState().get()

    if (!draft) {
      return
    }

    draft.addEventListener('mouseout', handler)

    return () => {
      draft.removeEventListener('mouseout', handler)
    }
  })
}
