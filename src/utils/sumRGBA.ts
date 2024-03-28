import { type IntRange } from '@/types/intRange'

type sumRGBAReturnType = {
  r: IntRange<0, 256>
  g: IntRange<0, 256>
  b: IntRange<0, 256>
  a: IntRange<0, 2>
}

type sumRGBAParam = {
  r: IntRange<0, 256>
  b: IntRange<0, 256>
  g: IntRange<0, 256>
  a: IntRange<0, 2>
}

export const sumRGBA = (
  firstRGBA: sumRGBAParam,
  secondRGBA: sumRGBAParam,
): sumRGBAReturnType => {
  const { r: r1, g: g1, b: b1, a: a1 } = firstRGBA
  const { r: r2, g: g2, b: b2, a: a2 } = secondRGBA

  let r = (r1 + r2) as IntRange<0, 256>
  let g = (g1 + g2) as IntRange<0, 256>
  let b = (b1 + b2) as IntRange<0, 256>
  let a = (a1 + a2) as IntRange<0, 2>

  if (r > 255) r = 255
  if (g > 255) g = 255
  if (b > 255) b = 255
  if (a > 1) a = 1

  return {
    r: r,
    g: g,
    b: b,
    a: a,
  }
}
