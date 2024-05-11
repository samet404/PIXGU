export type RGB = `rgb(${string}, ${string}, ${string})`
export type RGBA = `rgba(${string}, ${string}, ${string}, ${string})`
export type HSL = `hsl(${string}, ${string}%, ${string}%)`
export type HEX = `#${string}`

export type Color = RGB | RGBA | HEX | HSL

export type objRGB = {
  r: number
  g: number
  b: number
}

export type objRGBA = {
  r: number
  g: number
  b: number
  a: number
}

export type objHSL = {
  h: number
  s: number
  l: number
}

export type objColor = objRGB | objRGBA | objHSL
