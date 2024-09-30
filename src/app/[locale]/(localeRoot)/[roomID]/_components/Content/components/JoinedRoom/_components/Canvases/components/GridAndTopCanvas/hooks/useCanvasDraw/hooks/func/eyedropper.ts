import { useCanvasesMainData, usePainterTool } from '@/zustand/store'

export const eyedropper = (e: PointerEvent) => {
  const { main, zoom } = useCanvasesMainData.getState()
  if (!main) return

  const ctx = main.getContext('2d')!
  const bounding = main.getBoundingClientRect()
  const x = (e.clientX - bounding.left) * zoom
  const y = (e.clientY - bounding.top) * zoom

  const pixel = ctx.getImageData(x, y, 1, 1)
  const data = pixel.data

  console.log('eyedropper data: ', data)

  usePainterTool.getState().setRGBA({
    r: data[0] ?? 0,
    g: data[1] ?? 0,
    b: data[2] ?? 0,
    a: data[3] ? data[3] / 255 : 0,
  })
}
