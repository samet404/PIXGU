import type { IntRange } from '@/types'
import type { Player } from '@/zustand/store'

/**
 * WebRTCConnData is the type of data that
 *  is sent over the WebRTC connection.
 */
export type WebRTCConnData = DirectlyFromHost | DirectlyFromClient

/**
 * AllowedEvents event is sent from the host to
 * the client to tell the client which events are allowed.
 */
export type AllowedEvents = {
  from: 'host'
  event: 'allowedEvents'
  data: DirectlyFromClient['event'][]
}

/**
 * BlockedEvents event is sent from the host to
 * the client to tell the client which events are blocked.
 */
export type BlockedEvents = {
  from: 'host'
  event: 'blockedEvents'
  data: DirectlyFromClient['event'][]
}

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
type GuessChatFromClient = {
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
type WinnersChatFromClient = {
  event: 'winnersChat'
  data: {
    msg: string
  }
}

/**
 * DarkZoneChatFromHost event is sent from the host to the client to tell
 * the client that a player has sent a chat message.
 */
export type DarkZoneChatFromHost = {
  event: 'darkZoneChat'
  data: {
    msgID: string
    from: string
    msg: string
  }
}

/**
 * YourDarkZoneFromHost event is a data type sent from the host,
 * where the message of the user who sent the message to the chat is
 *  verified and sent back to the user who sent the message
 */
export type YourDarkZoneChatFromHost = {
  event: 'yourDarkZoneChat'
  data: {
    msgID: string
    msg: string
  }
}

/**
 * DarkZoneFromClient event is sent from the client to the host to tell winners chat msg
 */
export type DarkZoneChatFromClient = {
  event: 'darkZoneChat'
  data: {
    msg: string
  }
}

/**
 *  The PainterDrawFromHostAndClient event is first thrown by the client to the host.
 * Then the host validates and sent it to all other players.
 */
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

/**
 * The PainterDrawFromHostAndClient event is first thrown by the host to the new player.
 */
type PrevPlayers = {
  event: 'prevPlayers'
  data: Record<string, Player>
}

/**
 * The CurrentPainters event is sent from the host to the client to tell
 * the client who is currently painter.
 */
type CurrentPainter = {
  event: 'currentPainter'
  data: string
}

/**
 * UserLeft event is sent from the host to the client to tell
 * the client that a player has left the room.
 */
export type UserLeft = {
  event: 'playerLeft'
  data: {
    ID: string
  }
}

/**
 * UserJoined event is sent from the host to the client to tell
 * the client that a player has joined the room.
 */
export type UserJoined = {
  event: 'playerJoined'
  data: {
    ID: string
    usernameWithUsernameID: string
    profilePicture: string | null
  }
}

type PingPongData = {
  data: {
    date: number
    something: 'Ad eiusmod qui in aliqua irure. Ipsum eu elit enim mollit adipisicing incididunt.'
  }
}

type Ping = {
  event: 'ping'
} & PingPongData

type Pong = {
  event: 'pong'
} & PingPongData

/**
 * DirectlyFromHost is the type of data that is sent directly from the host.
 */
export type DirectlyFromHost = (
  | UserLeft
  | UserJoined
  | PainterDrawFromHostAndClient
  | PrevPlayers
  | CurrentPainter
  | GuessChatFromHost
  | WinnersChatFromHost
  | DarkZoneChatFromHost
  | YourGuessChatFromHost
  | YourWinnersChatFromHost
  | YourDarkZoneChatFromHost
  | Pong
) & {
  from: 'host'
}

/**
 * DirectlyFromClient is the type of data that is sent directly from the client.
 */
export type DirectlyFromClient = (
  | WinnersChatFromClient
  | GuessChatFromClient
  | DarkZoneChatFromClient
  | PainterDrawFromHostAndClient
  | Ping
) & {
  from: 'client'
}
