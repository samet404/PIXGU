import type { IntRange } from './intRange'

/**
 * WebRTCConnData is the type of data that is sent over the WebRTC connection.
 */
export type WebRTCConnData = Identified & (Chat | Draw)

type Chat = {
  event: 'chat'
  msg: string
}

type Draw = {
  event: 'draw'
  x: number
  y: number
  rgba: {
    r: IntRange<0, 256>
    g: IntRange<0, 256>
    b: IntRange<0, 256>
    a: IntRange<0, 2>
  }
}

/**
 * User type using for identifying the user.
 */
type Identified = {
  userID: string
  secretKey: string
}
