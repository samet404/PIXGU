import { minmax } from './minmax';

/**
 * @example
 * 
 * const background = new Uint8ClampedArray([255, 255, 255, 255])
 * const foreground = new Uint8ClampedArray([0, 100, 0, 255])
 * 
 * alphaBlendRGB(background, foreground)
 */
export const alphaBlendRGBA = <I1 extends Uint8ClampedArray, I2 extends Uint8ClampedArray>(background: I1, foreground: I2) => {
    const [rb, gb, bb, iAb] = background as unknown as [number, number, number, number]
    const [rf, gf, bf, iAf] = foreground as unknown as [number, number, number, number]
    const ab = iAb / 255
    const af = iAf / 255

    const a = ab * (1 - af) + af;
    if (a === 0) return new Uint8ClampedArray([0, 0, 0, 0]);

    const r = minmax(0, (ab * (1 - af) * rb + rf * af) / a, 255);
    const g = minmax(0, (ab * (1 - af) * gb + gf * af) / a, 255);
    const b = minmax(0, (ab * (1 - af) * bb + bf * af) / a, 255);

    return new Uint8ClampedArray([r, g, b, a]);
};