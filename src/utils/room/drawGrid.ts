import { useCanvasesMainData } from '@/zustand/store'

export const drawGrid = () => {
  const { cellSideCount, grid } = useCanvasesMainData.getState().get()
  if (!grid) return

  const gridCanvasWidth = grid.width
  const cellPixelLength = grid.width / cellSideCount

  const gctx = grid.getContext('2d')!

  for (let i = 1; cellPixelLength * grid.width > i; i++) {
    gctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
    gctx.fillRect(0, cellPixelLength * i, gridCanvasWidth, 1)
    gctx.fillRect(cellPixelLength * i, 0, 1, gridCanvasWidth)
  }

  localStorage.setItem('grid', 'true')
}
