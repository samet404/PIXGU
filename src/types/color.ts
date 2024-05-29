import type { IntRange } from './intRange'

export type RGB = `rgb(${string}, ${string}, ${string})`
export type RGBA = `rgba(${string}, ${string}, ${string}, ${string})`
export type HSL = `hsl(${string}, ${string}%, ${string}%)`
export type HEX = `#${string}`

export type Color = RGB | RGBA | HEX | HSL

export type RGBObj = {
  r: IntRange<0, 256>
  g: IntRange<0, 256>
  b: IntRange<0, 256>
}

export type RGBAObj = {
  r: IntRange<0, 256>
  g: IntRange<0, 256>
  b: IntRange<0, 256>
  a: IntRange<0, 2>
}

export type HSLObj = {
  h: number
  s: number
  l: number
}

export type objColor = RGBObj | RGBAObj | HSLObj
