export const getPixel = (
  imageData: ImageData,
  cellPixelLength: number,
  x: number,
  y: number
): [number, number, number, number] => {
  const index =
    ((Math.floor(y * cellPixelLength) * imageData.width) +
      Math.floor(x * cellPixelLength)) * 4;

  return [
    imageData.data[index]!,     // r
    imageData.data[index + 1]!, // g
    imageData.data[index + 2]!, // b
    imageData.data[index + 3]!  // a
  ];
}