import type { IntRange } from './intRange'

/**
 * WebRTCConnData is the type of data that is sent over the WebRTC connection.
 */
export type WebRTCConnData = Meet | Chat | Draw

type Meet = {
  event: 'meet'
  userInfo: {
    ID: string
    name: string
    pfp: string | null
  }
}

type Chat = {
  event: 'chat'
  ID: string
  msg: string
}

type Draw = {
  event: 'draw'
  ID: string
  x: number
  y: number
  r: IntRange<0, 256>
  g: IntRange<0, 256>
  b: IntRange<0, 256>
  a: IntRange<0, 2>
}
