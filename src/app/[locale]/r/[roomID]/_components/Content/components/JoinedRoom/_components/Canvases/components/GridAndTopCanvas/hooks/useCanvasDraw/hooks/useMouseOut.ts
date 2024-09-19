import { useEffectOnce } from '@/hooks/useEffectOnce'
import {
  useAmIPainting,
  useCanvasesMainData,
  usePixelsOnDraw,
  useWhoIsPainterClient,
} from '@/zustand/store'

export const useMouseOut = () => {
  const handler = () => {
    console.log('mouse out')
    const canvasesMainData = useCanvasesMainData.getState().get()
    // const whoIsPainter = useWhoIsPainterClient.getState().value

    // if (whoIsPainter.status === 'thereIsNoPainter') return
    // if (!whoIsPainter.amIPainter) return

    useAmIPainting.getState().imNotPainting()

    const dctx = canvasesMainData.grid!.getContext('2d')!
    dctx.beginPath()

    usePixelsOnDraw.getState().reset()
  }

  useEffectOnce(() => {
    const { grid } = useCanvasesMainData.getState().get()

    if (!grid) {
      return
    }

    grid.addEventListener('pointerout', handler)

    return () => {
      grid.removeEventListener('pointerout', handler)
    }
  })
}
