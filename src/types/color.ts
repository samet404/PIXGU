import type { IntRange } from './intRange'

export type RGB = `rgb(${string}, ${string}, ${string})`
export type RGBA = `rgba(${string}, ${string}, ${string}, ${string})`
export type HSL = `hsl(${string}, ${string}%, ${string}%)`
export type HEX = `#${string}`

export type Color = RGB | RGBA | HEX | HSL

export type RGBObj = {
  r: number
  g: number
  b: number
}

export type RGBAObj = {
  r: number
  g: number
  b: number
  a: number
}

export type HSLObj = {
  h: number
  s: number
  l: number
}

export type objColor = RGBObj | RGBAObj | HSLObj
