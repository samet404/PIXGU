export const initlizeCanvasPixels = (pixels: Uint8ClampedArray[][], cellSideCount: number) => {
    for (let x = 0; x < cellSideCount; x++) {
        pixels[x] = []
        for (let y = 0; y < cellSideCount; y++) {
            pixels[x]![y] = new Uint8ClampedArray([255, 255, 255, 255])
        }
    }
}