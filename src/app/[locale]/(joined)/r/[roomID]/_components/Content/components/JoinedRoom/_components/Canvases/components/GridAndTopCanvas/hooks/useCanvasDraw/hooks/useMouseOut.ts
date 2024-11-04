import { useEffectOnce } from '@/hooks/useEffectOnce'
import {
  useAmIPainting,
  useCanvasesMainData,
  usePainterTool,
} from '@/zustand/store'
import { amIPainter } from './func'
import { storePixelsOnDraw } from '@/store'

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

          storePixelsOnDraw.reset()
        }
        break
    }
  }

  useEffectOnce(() => {
    const { grid } = useCanvasesMainData.getState().get()


    grid!.addEventListener('pointerout', handler)

    return () => {
      grid!.removeEventListener('pointerout', handler)
    }
  })
}
