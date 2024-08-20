import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useCanvasesMainData, usePainterData } from '@/zustand/store'

export const useMouseUp = () => {
  const handler = () => {
    const painterData = usePainterData.getState().get()
    if (!painterData?.amIPainter) return null

    const setPainterData = usePainterData.getState().add

    const { draft, main } = useCanvasesMainData.getState().get()

    const dctx = draft!.getContext('2d')!
    const mctx = main!.getContext('2d')!

    setPainterData({
      ...painterData,
      amIPainting: false,
    })

    mctx.drawImage(draft!, 0, 0) // copy drawing to main
    dctx.clearRect(0, 0, draft!.width, draft!.height) // clear draft
  }

  useEffectOnce(() => {
    const { draft } = useCanvasesMainData.getState().get()

    if (!draft) {
      return
    }

    draft.addEventListener('mouseup', handler)
    return () => {
      draft.removeEventListener('mouseup', handler)
    }
  })
}
