import { useEffectOnce } from '@/hooks/useEffectOnce'
import {
  useAmIPainting,
  useCanvasesMainData,
  usePixelsOnDraw,
  useWhoIsPainterClient,
} from '@/zustand/store'

export const useMouseUp = () => {
  const handler = () => {
    // const whoIsPainter = useWhoIsPainterClient.getState().value

    // if (whoIsPainter.status === 'thereIsNoPainter') return
    // if (!whoIsPainter.amIPainter) return

    useAmIPainting.getState().imNotPainting()

    const { draft, main } = useCanvasesMainData.getState().get()

    const dctx = draft!.getContext('2d')!
    const mctx = main!.getContext('2d')!

    mctx.drawImage(draft!, 0, 0) // copy drawing to main
    dctx.clearRect(0, 0, draft!.width, draft!.height) // clear draft

    usePixelsOnDraw.getState().reset()
  }

  useEffectOnce(() => {
    const { grid } = useCanvasesMainData.getState().get()

    if (!grid) {
      return
    }

    grid.addEventListener('mouseup', handler)
    return () => {
      grid.removeEventListener('mouseup', handler)
    }
  })
}
