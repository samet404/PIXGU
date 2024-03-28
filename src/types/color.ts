// Color types

export type RGB = `rgb(${string}, ${string}, ${string})`
export type RGBA = `rgba(${string}, ${string}, ${string}, ${string})`
export type HSL = `hsl(${string}, ${string}%, ${string}%)`
export type HEX = `#${string}`
export type Color = RGB | RGBA | HEX | HSL
