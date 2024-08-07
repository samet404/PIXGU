import type { IntRange } from './intRange'

/**
 * WebRTCConnData is the type of data that is sent over the WebRTC connection.
 */
export type WebRTCConnData = DirectlyFromHost | DirectlyFromClient

export type GuessChatFromHost = {
  event: 'guessChat'
  data: {
    from: string
    msg: string
  }
}

type GuessChatFromClient = {
  event: 'guessChat'
  data: {
    msg: string
  }
}

export type WinnersChatFromHost = {
  event: 'winnersChat'
  data: {
    from: string
    msg: string
  }
}

type WinnersChatFromClient = {
  event: 'winnersChat'
  data: {
    msg: string
  }
}

type PainterDrawFromHostAndClient = {
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

type PlayersDbInfoOrderedByJoinTime = {
  event: 'PlayersDbInfoOrderedByJoinTime'
  data: {
    players: Record<
      string,
      {
        usernameWithUsernameID: string
        profilePicture: string | null
      }
    >
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
  event: 'playerLeft'
  data: {
    ID: string
  }
}

export type UserJoined = {
  event: 'playerJoined'
  data: {
    ID: string
    usernameWithUsernameID: string
    profilePicture: string | null
  }
}

/** Means there is no request/response */
export type DirectlyFromHost = (
  | UserLeft
  | UserJoined
  | PainterDrawFromHostAndClient
  | PlayersDbInfoOrderedByJoinTime
  | GuessChatFromHost
  | WinnersChatFromHost
  | CurrentPainters
) & {
  from: 'host'
}

export type DirectlyFromClient = (
  | WinnersChatFromClient
  | GuessChatFromClient
  | PainterDrawFromHostAndClient
) & {
  from: 'client'
}
