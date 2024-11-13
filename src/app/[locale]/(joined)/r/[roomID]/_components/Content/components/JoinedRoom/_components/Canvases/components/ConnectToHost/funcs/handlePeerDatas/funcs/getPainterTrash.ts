import { useCanvasesMainData } from '@/zustand/store'

export const getPainterTrash = () => {
  const { main } = useCanvasesMainData.getState().get()

  const ctx = main!.getContext('2d')!
  ctx.beginPath()
  ctx.clearRect(0, 0, main!.width, main!.height)
  ctx.beginPath()
}
