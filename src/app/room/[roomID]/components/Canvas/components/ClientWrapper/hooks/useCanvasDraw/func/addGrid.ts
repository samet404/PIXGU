export const addGrid = (cellPixelLength: number) => {
  const gridCanvas = document.getElementById('grid-canvas') as HTMLCanvasElement
  const gridCanvasWidth = gridCanvas.width
  const gctx = gridCanvas.getContext('2d')!

  for (let i = 1; cellPixelLength * 2 > i; i++) {
    gctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    gctx.fillRect(0, cellPixelLength * i, gridCanvasWidth, 1)
    gctx.fillRect(cellPixelLength * i, 0, 1, gridCanvasWidth)
  }
}
