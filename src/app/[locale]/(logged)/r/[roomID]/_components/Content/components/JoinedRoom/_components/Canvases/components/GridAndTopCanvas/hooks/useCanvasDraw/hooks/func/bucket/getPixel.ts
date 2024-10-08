export const getPixel = (imageData: ImageData, x: number, y: number) => {
  const index = (y * imageData.width + x) * 4
  return imageData.data.slice(index, index + 4)
}
