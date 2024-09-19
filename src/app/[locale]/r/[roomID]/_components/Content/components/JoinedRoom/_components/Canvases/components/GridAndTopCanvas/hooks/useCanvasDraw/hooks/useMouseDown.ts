import { draw } from './func'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import {
  useCanvasesMainData,
  useAmIPainting,
  useIsEyeDropperOpen,
  useRgba,
  useXY,
} from '@/zustand/store'

export const useMouseDown = (myUserID: string) => {
  const handler = (e: PointerEvent) => {
    console.log('startPosition')
    // const whoIsPainter = useWhoIsPainterClient.getState().value

    // if (whoIsPainter.status === 'thereIsNoPainter') return
    // if (!whoIsPainter.amIPainter) return null
    if (e.button !== 0) return null

    const {
      draft: dc,
      zoom,
      cellPixelLength,
    } = useCanvasesMainData.getState().get()
    if (!dc || !cellPixelLength || !zoom) return

    const dcBoundingRect = dc.getBoundingClientRect()

    const x = (e.clientX - dcBoundingRect.left) * zoom
    const y = (e.clientY - dcBoundingRect.top) * zoom
    const newX = Math.floor(x / cellPixelLength)
    const newY = Math.floor(y / cellPixelLength)
    useXY.getState().set(newX, newY)

    if (useIsEyeDropperOpen.getState().isOpen) {
      const canvas = useCanvasesMainData.getState().main
      if (!canvas) return

      const ctx = canvas.getContext('2d')!
      const bounding = canvas.getBoundingClientRect()
      const x = e.clientX - bounding.left
      const y = e.clientY - bounding.top
      const pixel = ctx.getImageData(x, y, 1, 1)
      const data = pixel.data

      console.log(data)

      useRgba.getState().set({
        r: data[0] ?? 0,
        g: data[1] ?? 0,
        b: data[2] ?? 0,
        a: data[3] ? data[3] / 255 : 0,
      })
      useIsEyeDropperOpen.getState().close()

      return
    }

    console.log('im painting')
    useAmIPainting.getState().imPainting()

    //
    draw(e, myUserID, newX, newY)
  }

  useEffectOnce(() => {
    console.log('mousedown')
    const canvasesMainData = useCanvasesMainData.getState().get()

    if (!canvasesMainData.grid) {
      return
    }

    canvasesMainData.grid.addEventListener('pointerdown', handler)

    return () => {
      canvasesMainData.grid!.removeEventListener('pointerdown', handler)
    }
  })
}
