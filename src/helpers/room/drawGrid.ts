import { useCanvasesMainData } from '@/zustand/store/useCanvasesMainData'

export function drawGrid() {
  const { cellPixelLength, main, grid, gctx } = useCanvasesMainData.getState().get()
  if (!grid || !main || !cellPixelLength) return
  const gridCanvasWidth = grid.width

  // Create ImageData for a single grid line
  const lineData = new Uint8ClampedArray(gridCanvasWidth * 4)
  for (let i = 0; i < lineData.length; i += 4) {
    lineData[i] = 0 // Red
    lineData[i + 1] = 0 // Green
    lineData[i + 2] = 0 // Blue
    lineData[i + 3] = 51 // Alpha (0.2 * 255 ≈ 51)
  }
  const horizontalLine = new ImageData(lineData, gridCanvasWidth, 1)
  const verticalLine = new ImageData(lineData, 1, gridCanvasWidth)

  for (let i = 0; cellPixelLength + 2 * grid.width > i; i++) {
    // Draw horizontal line
    gctx!.putImageData(horizontalLine, 0, cellPixelLength * i)

    // Draw vertical line
    gctx!.putImageData(verticalLine, cellPixelLength * i, 0)
  }
}
