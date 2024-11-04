import { useEffectOnce } from '@/hooks/useEffectOnce'
import {
  useAmIPainting,
  useCanvasesMainData,
  usePainterTool,
} from '@/zustand/store'
import { amIPainter } from './func'
import { storePixelsOnDraw } from '@/store'

export const useMouseUp = () => {
  console.log('mouse up')
  const handler = () => {
    if (!amIPainter()) return

    const { draft, main } = useCanvasesMainData.getState().get()

    const dctx = draft!.getContext('2d')!
    const mctx = main!.getContext('2d')!


    storePixelsOnDraw.setLastPixel(null)
    useAmIPainting.getState().imNotPainting()
    storePixelsOnDraw.reset()

    const tool = usePainterTool.getState().current

    switch (tool) {
      case 'pencil':
        dctx.beginPath()
        storePixelsOnDraw.reset()
        break
    }
  }

  useEffectOnce(() => {
    const { grid } = useCanvasesMainData.getState().get()

    if (!grid) {
      return
    }

    grid.addEventListener('pointerup', handler)
    return () => {
      grid.removeEventListener('pointerup', handler)
    }
  })
}
