import { useEffectOnce } from '@/hooks/useEffectOnce'
import {
  useAmIPainting,
  useCanvasesMainData,
  usePainterTool,
  usePixelsOnDraw,
} from '@/zustand/store'
import { amIPainter } from './func'

export const useMouseUp = () => {
  console.log('mouse up')
  const handler = () => {
    if (!amIPainter()) return

    const { draft, main } = useCanvasesMainData.getState().get()

    const dctx = draft!.getContext('2d')!
    const mctx = main!.getContext('2d')!

    mctx.drawImage(draft!, 0, 0) // copy drawing to main
    dctx.clearRect(0, 0, draft!.width, draft!.height) // clear draft

    useAmIPainting.getState().imNotPainting()
    usePixelsOnDraw.getState().reset()

    const tool = usePainterTool.getState().current

    switch (tool) {
      case 'pencil':
        dctx.beginPath()
        usePixelsOnDraw.getState().reset()
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
