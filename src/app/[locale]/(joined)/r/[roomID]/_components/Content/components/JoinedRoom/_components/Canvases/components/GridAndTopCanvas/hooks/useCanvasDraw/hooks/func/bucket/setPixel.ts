export const setPixel = (
  imageData: ImageData,
  cellSideCount: number,
  x: number,
  y: number,
  r: number,
  g: number,
  b: number,
  a: number,
) => {
  for (let dy = 0; dy < cellSideCount; dy++) {
    for (let dx = 0; dx < cellSideCount; dx++) {
      const index =
        ((Math.floor(y * cellSideCount) + dy) * imageData.width +
          (Math.floor(x * cellSideCount) + dx)) *
        4
      imageData.data[index] = r
      imageData.data[index + 1] = g
      imageData.data[index + 2] = b
      imageData.data[index + 3] = a
    }
  }
}
