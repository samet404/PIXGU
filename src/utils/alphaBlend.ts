export const alphaBlendRGBA = (background: Uint8ClampedArray, foreground: Uint8ClampedArray) => {
    const af = foreground[3]! / 255

    // Fast path: if foreground is fully opaque or background is fully transparent
    if (af === 1 || background[3] === 0) return new Uint8ClampedArray(foreground)

    // Fast path: if foreground is fully transparent
    if (af === 0) return new Uint8ClampedArray(background)

    const ab = background[3]! / 255
    const a = (ab * (1 - af) + af)

    const blend = 1 / a
    const r = Math.round((ab * (1 - af) * background[0]! + foreground[0]! * af) * blend)
    const g = Math.round((ab * (1 - af) * background[1]! + foreground[1]! * af) * blend)
    const b = Math.round((ab * (1 - af) * background[2]! + foreground[2]! * af) * blend)

    return new Uint8ClampedArray([r, g, b, 255])
}