import type { Player } from '@/zustand/store'

/**
 * WebRTCConnData is the type of data that
 *  is sent over the WebRTC connection.
 */
export type WebRTCConnData = WebRTCConnDataFromHost | WebRTCConnDataFromClient

/**
 * GuessChatFromHost event is sent from the host to the client to tell
 * the client that a player has sent a chat message.
 */
export type GuessChatFromHost = {
  event: 'guessChat'
  data: {
    from: string
    msgID: string
    msg: string
  }
}

/**
 * YourGuessChatFromHost event is a data type sent from the host,
 * where the message of the user who sent the message to the chat is
 *  verified and sent back to the user who sent the message
 */
export type YourGuessChatFromHost = {
  event: 'yourGuessChat'
  data: {
    msgID: string
    msg: string
  }
}

/**
 * GuessChatFromClient event is sent from the client to the host to tell guess chat msg
 */
export type GuessChatFromClient = {
  event: 'guessChat'
  data: {
    msg: string
  }
}

/**
 * WinnersChatFromHost event is sent from the host to the client to tell
 * the client that a player has sent a chat message.
 */
export type WinnersChatFromHost = {
  event: 'winnersChat'
  data: {
    msgID: string
    from: string
    msg: string
  }
}

/**
 * YourWinnersChatFromHost event is a data type sent from the host,
 * where the message of the user who sent the message to the chat is
 *  verified and sent back to the user who sent the message
 */
export type YourWinnersChatFromHost = {
  event: 'yourWinnersChat'
  data: {
    msgID: string
    msg: string
  }
}

/**
 * WinnersChatFromClient event is sent from the client to the host to tell winners chat msg
 */
export type WinnersChatFromClient = {
  event: 'winnersChat'
  data: {
    msg: string
  }
}

/**
 *  The PainterDrawFromHostAndClient event is first thrown by the client to the host.
 * Then the host validates and sent it to all other players.
 */
export type PainterDrawFromHostAndClient = {
  event: 'painterDraw'
  data: {
    painterID: string
    x: number
    y: number
    rgba: {
      r: number
      g: number
      b: number
      a: number
    }
  }
}

/**
 * The PainterDrawFromHostAndClient event is first thrown by the host to the new player.
 */
export type PrevPlayers = {
  event: 'prevPlayers'
  data: Record<string, Player>
}

/**
 * The CurrentPainters event is sent from the host to the client to tell
 * the client who is currently painter.
 */
export type CurrentPainter = {
  event: 'currentPainter'
  data: string
}

/**
 * PlayerLeft event is sent from the host to the client to tell
 * the client that a player has left the room.
 */
export type PlayerLeft = {
  event: 'playerLeft'
  data: {
    ID: string
  }
}

/**
 * UserJoined event is sent from the host to the client to tell
 * the client that a player has joined the room.
 */
export type PlayerJoined = {
  event: 'playerJoined'
  data: {
    ID: string
    username: string
    usernameID: string
    usernameWithUsernameID: string
    profilePicture: string | null
    isSpectator: boolean
  }
}

type PingPongData = {
  data: {
    date: number
    something: 'Ad eiusmod qui in aliqua irure. Ipsum eu elit enim mollit adipisicing incididunt.'
  }
}

export type Ping = {
  event: 'ping'
} & PingPongData

export type Pong = {
  event: 'pong'
} & PingPongData

export type SelectThemeFromHost = {
  event: 'selectTheme'
  data: [string, string]
}

export type SelectThemeFromClient = {
  event: 'selectTheme'
  data: string
}

export type PainterSelectedTheme = {
  event: 'painterSelectedTheme'
}

export type PainterSelectingTheme = {
  event: 'painterSelectingTheme'
}

export type PainterCouldNotSelectTheme = {
  event: 'painterCouldNotSelectTheme'
  data: 'timeIsUp' | 'playerLeft'
}

export type Coin = {
  event: 'coin'
  data: {
    to: string
    amount: number
  }
}

export type Guessed = {
  event: 'guessed'
  data: {
    ID: string
  }
}

export type YourCoin = {
  event: 'yourCoin'
  data: {
    amount: number
  }
}

export type YouGuessed = {
  event: 'youGuessed'
}

export type YouAreSpectator = {
  event: 'youAreSpectator'
}

export type Spectator = {
  event: 'spectator'
  data: {
    ID: string
  }
}

export type PrevSpectators = {
  event: 'prevSpectators'
  data: string[]
}

export type GameIsStopped = {
  event: 'gameIsStopped'
}

/**
 * DirectlyFromHost is the type of data that is sent directly from the host.
 */
export type WebRTCConnDataFromHost = (
  | PlayerLeft
  | PlayerJoined
  | PainterDrawFromHostAndClient
  | PrevPlayers
  | CurrentPainter
  | GuessChatFromHost
  | WinnersChatFromHost
  | YourGuessChatFromHost
  | YourWinnersChatFromHost
  | Pong
  | SelectThemeFromHost
  | PainterSelectedTheme
  | PainterSelectingTheme
  | PainterCouldNotSelectTheme
  | Guessed
  | Coin
  | YourCoin
  | YouGuessed
  | YouAreSpectator
  | Spectator
  | PrevSpectators
  | GameIsStopped
) & {
  from: 'host'
}

/**
 * DirectlyFromClient is the type of data that is sent directly from the client.
 */
export type WebRTCConnDataFromClient = (
  | WinnersChatFromClient
  | GuessChatFromClient
  | PainterDrawFromHostAndClient
  | Ping
  | SelectThemeFromClient
) & {
  from: 'client'
}
