export const calculatePixelsBetween = (
  prevX: number,
  prevY: number,
  nextX: number,
  nextY: number,
): { x: number; y: number }[] => {
  // Pre-calculate length to avoid unnecessary calculations
  const dx = Math.abs(nextX - prevX)
  const dy = Math.abs(nextY - prevY)
  const pixels = new Array(Math.max(dx, dy) - 1)

  const sx = prevX < nextX ? 1 : -1
  const sy = prevY < nextY ? 1 : -1
  let err = dx - dy
  let index = 0

  let x = prevX
  let y = prevY

  while (x !== nextX || y !== nextY) {
    const e2 = err << 1 // Faster than 2 * err

    if (e2 > -dy) {
      err -= dy
      x += sx
    }
    if (e2 < dx) {
      err += dx
      y += sy
    }

    if (x !== nextX || y !== nextY) { // Don't add last point
      pixels[index++] = { x, y }
    }
  }

  return pixels.slice(0, index) // Return only filled positions
}
