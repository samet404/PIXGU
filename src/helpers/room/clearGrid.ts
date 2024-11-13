import { useCanvasesMainData } from '@/zustand/store'

export const clearGrid = () => {
  const { grid } = useCanvasesMainData.getState().get()
  if (!grid) return

  const gctx = grid.getContext('2d')!
  gctx.clearRect(0, 0, grid.width, grid.height)
  localStorage.setItem('grid', 'false')
}
