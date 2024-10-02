import { useCanvasesMainData } from '@/zustand/store'

export const getPainterTrash = () => {
  const main = useCanvasesMainData.getState().get().main!
  const mctx = main.getContext('2d')!

  mctx.beginPath()
  mctx.fillStyle = '#ffffff'
  mctx.fillRect(0, 0, main.width, main.height)
  mctx.beginPath()
}
