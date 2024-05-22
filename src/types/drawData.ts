import type { MutableRefObject } from 'react'

export type DrawDataRef = MutableRefObject<{
  userID: string
  roomID: string
  x: string
  y: string
  rgb: `rgb(${string}, ${string}, ${string})`
  opacity: number
}>
