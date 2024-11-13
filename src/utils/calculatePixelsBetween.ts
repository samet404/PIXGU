export const calculatePixelsBetween = (
  prevX: number,
  prevY: number,
  nextX: number,
  nextY: number,
): { x: number; y: number }[] => {
  // Pre-calculate length to avoid unnecessary calculations
  const dx = Math.abs(nextX - prevX)
  const dy = Math.abs(nextY - prevY)

  // Return empty array if points are the same
  if (dx === 0 && dy === 0) return []

  // Create array with correct length
  const pixels = new Array(Math.max(dx, dy))

  const sx = prevX < nextX ? 1 : -1
  const sy = prevY < nextY ? 1 : -1
  let err = dx - dy
  let index = 0

  let x = prevX
  let y = prevY

  while (x !== nextX || y !== nextY) {
    const e2 = err << 1

    if (e2 > -dy) {
      err -= dy
      x += sx
    }
    if (e2 < dx) {
      err += dx
      y += sy
    }

    if (x !== nextX || y !== nextY) {
      pixels[index++] = { x, y }
    }
  }

  return pixels.slice(0, index)
}
