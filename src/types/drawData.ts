export type drawData = {
  userID: string
  roomID: string
  lines: {
    x: number
    y: number
  }[]
  color: {
    r: string
    g: string
    b: string
    a: string
  }
  thickness: string
  lineCap: 'round' | 'butt' | 'square'
}
