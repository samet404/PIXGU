export const setPixel = (
  imageData: ImageData,
  cellPixelLength: number,
  x: number,
  y: number,
  r: number,
  g: number,
  b: number,
  a: number,
) => {
  for (let dy = 0; dy < cellPixelLength; dy++) {
    for (let dx = 0; dx < cellPixelLength; dx++) {
      const index =
        ((Math.floor(y * cellPixelLength) + dy) * imageData.width +
          (Math.floor(x * cellPixelLength) + dx)) *
        4
      imageData.data[index] = r
      imageData.data[index + 1] = g
      imageData.data[index + 2] = b
      imageData.data[index + 3] = a
    }
  }
}
