
export const createGradient = (
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    startColor: Uint8ClampedArray | [number, number, number, number],
    endX: number,
    endY: number,
    endColor: Uint8ClampedArray | [number, number, number, number],
) => {
    const gradient = ctx.createLinearGradient(startX, startY, endX, endY)
    gradient.addColorStop(0, `rgba(${startColor[0]}, ${startColor[1]}, ${startColor[2]}, ${startColor[3]})`)
    gradient.addColorStop(1, `rgba(${endColor[0]}, ${endColor[1]}, ${endColor[2]}, ${endColor[3]})`)

    return gradient
}