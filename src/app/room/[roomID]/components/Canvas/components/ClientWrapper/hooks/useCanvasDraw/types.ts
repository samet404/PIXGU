export type pixelHistory = Record<
  `${string}_${string}`,
  {
    rgb: `rgb(${string}, ${string}, ${string})`
    opacity: number
  }
>
