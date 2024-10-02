import { useEffectOnce } from '@/hooks/useEffectOnce'
import {
  useAmIPainting,
  useCanvasesMainData,
  usePainterTool,
  usePixelsOnDraw,
} from '@/zustand/store'
import { amIPainter } from './func'

export const useMouseOut = () => {
  const handler = () => {
    console.log('mouse out')

    if (!amIPainter()) return

    const canvasesMainData = useCanvasesMainData.getState().get()
    const toolName = usePainterTool.getState().current

    useAmIPainting.getState().imNotPainting()

    switch (toolName) {
      case 'pencil':
        {
          const dctx = canvasesMainData.grid!.getContext('2d')!
          dctx.beginPath()

          usePixelsOnDraw.getState().reset()
        }
        break
    }
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
