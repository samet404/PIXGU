export const calculatePixelsBetween = (
  prevX: number,
  prevY: number,
  nextX: number,
  nextY: number,
): { x: number; y: number }[] => {
  const pixels: { x: number; y: number }[] = []

  // Bresenham's line algorithm
  const dx = Math.abs(nextX - prevX)
  const dy = Math.abs(nextY - prevY)
  const sx = prevX < nextX ? 1 : -1
  const sy = prevY < nextY ? 1 : -1
  let err = dx - dy

  let x = prevX
  let y = prevY

  while (true) {
    pixels.push({ x, y })

    if (x === nextX && y === nextY) break

    const e2 = 2 * err
    if (e2 > -dy) {
      err -= dy
      x += sx
    }
    if (e2 < dx) {
      err += dx
      y += sy
    }
  }

  return pixels
}
