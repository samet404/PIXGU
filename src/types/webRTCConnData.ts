import type { IntRange } from './intRange'

/**
 * WebRTCConnData is the type of data that is sent over the WebRTC connection.
 */
export type WebRTCConnData = DirectlyFromHost

type GuessChat = {
  event: 'guessChat'
  data: {
    msg: string
  }
}

type WinnersChat = {
  event: 'winnersChat'
  data: {
    msg: string
  }
}

type PainterDraw = {
  event: 'painterDraw'
  data: {
    painterID: string
    x: number
    y: number
    rgba: {
      r: IntRange<0, 256>
      g: IntRange<0, 256>
      b: IntRange<0, 256>
      a: IntRange<0, 2>
    }
  }
}

type PlayersIDsOrderedByTimestamp = {
  event: 'playersIDsOrderedByTimestamp'
  data: {
    playersIDs: string[]
  }
}

type CurrentPainters = {
  event: 'currentPainters'
  data: {
    painter1ID: string
    painter2ID: string
  }
}

export type UserLeft = {
  event: 'userLeft'
  data: {
    userID: string
  }
}

export type UserJoined = {
  event: 'userJoined'
  data: {
    userID: string
  }
}

/** Means there is no request/response */
export type DirectlyFromHost = (
  | UserLeft
  | UserJoined
  | PainterDraw
  | PlayersIDsOrderedByTimestamp
  | GuessChat
  | WinnersChat
  | CurrentPainters
) & {
  type: 'directlyFromHost'
}
