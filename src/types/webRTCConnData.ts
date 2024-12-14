import type { Player } from '@/zustand/store'
import type { User } from 'lucia'
import type { Powerup } from './powerups'

/**
 * WebRTCConnData is the type of data that
 *  is sent over the WebRTC connection.
 */
export type WebRTCConnData = WebRTCConnDataFromHost | WebRTCConnDataFromClient

export type GuessChatFromHost = {
  event: 'guessChat'
  data: {
    from: string
    msgID: number
    msg: string
    similarity: number
  }
}

export type YourGuessChatFromHost = {
  event: 'yourGuessChat'
  data: {
    msgID: number
    msg: string
    similarity: number
  }
}

export type GuessChatFromClient = {
  event: 'guessChat'
  data: {
    msg: string
  }
}

export type WinnersChatFromHost = {
  event: 'winnersChat'
  data: {
    msgID: number
    from: string
    msg: string
  }
}

export type YourWinnersChatFromHost = {
  event: 'yourWinnersChat'
  data: {
    msgID: number
    msg: string
  }
}

export type WinnersChatFromClient = {
  event: 'winnersChat'
  data: {
    msg: string
  }
}

export type PainterMouseDown = {
  event: 'painterMouseDown'
  data: Uint16Array
}

export type PainterPencil = {
  event: 'painterPencil'
  data: {
    x: number
    y: number
    color: Uint8ClampedArray
    size: number
  }
}

export type PainterEraserOrPencilOut = {
  event: 'painterEraserOrPencilOut'
}

export type PainterEraser = {
  event: 'painterEraser'
  data: {
    x: number
    y: number
    size: number
  }
}

export type PainterTrash = {
  event: 'painterTrash'
}

export type PainterBucket = {
  event: 'painterBucket'
  data: {
    x: number
    y: number
    color: Uint8ClampedArray
  }
}

export type PrevCanvas = {
  event: 'prevCanvas'
  data: Uint8ClampedArray[][]

}

export type PrevPlayers = {
  event: 'prevPlayers'
  data: Record<string, Player>
}

export type CurrentPainter = {
  event: 'currentPainter'
  data: string
}

export type PlayerLeft = {
  event: 'playerLeft'
  data: {
    ID: string
  }
}

export type PlayerJoined = {
  event: 'playerJoined'
  data: Player & {
    isSpectator: boolean
  }
}

type PingPongData = {
  date: number
  something: 'Ad eiusmod qui in aliqua irure. Ipsum eu elit enim mollit adipisicing incididunt.'
  ping?: number
}

export type Ping = {
  event: 'ping'
  data: PingPongData
}

export type Pong = {
  event: 'pong'
  data: PingPongData
}

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

export type PainterSelectedThemeTimeIsUp = {
  event: 'painterSelectedThemeTimeIsUp'
}

export type Guessed = {
  event: 'guessed'
  data: {
    ID: string
  }
}

export type Coin = {
  event: 'coin'
  data: {
    to: string
    amount: number
  }
}

export type PrevCoins = {
  event: 'prevCoins'
  data: Record<User['id'], number>
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

export type EveryoneGuessed = {
  event: 'everyoneGuessed'
}

export type GameEnded = {
  event: 'gameEnded'
  data: {
    coins: [string, number][]
  }
}

export type BuyMarketItem = {
  event: 'buyMarketItem'
  data: {
    name: Powerup
  }
}

export type YouPurchasedMarketItem = {
  event: 'youPurchasedMarketItem'
  data: {
    name: Powerup
    price: number
  }
}

export type PurchasedMarketItem = {
  event: 'purchasedMarketItem'
  data: {
    userID: string
    price: number
    name: Powerup
  }
}

export type UsePowerup = {
  event: 'usePowerup'
  data: {
    name: Powerup
  }
}

export type PowerupUsed = {
  event: 'powerupUsed'
  data: {
    name: Powerup
    userID: string
  }
}

export type YouUsedPowerup = {
  event: 'youUsedPowerup'
  data: {
    name: 'letterHint'
    data: string
  }
}

export type GameLog = {
  event: 'gameLog'
  data: {
    data: string
    color: 'red' | 'green' | 'yellow'
    time: number
  }
}

export type UndoRedo = {
  event: 'undoRedo'
  data: {
    type: 0 | 1
    direction: 0 | 1
  }
}

export type WebRTCConnDataFromHost = (
  | PlayerLeft
  | PlayerJoined
  | PrevPlayers
  | GameLog
  | CurrentPainter
  | GuessChatFromHost
  | WinnersChatFromHost
  | YourGuessChatFromHost
  | YourWinnersChatFromHost
  | SelectThemeFromHost
  | PainterSelectedTheme
  | PainterSelectingTheme
  | PainterSelectedThemeTimeIsUp
  | Guessed
  | Coin
  | YourCoin
  | PrevCoins
  | YouGuessed
  | YouAreSpectator
  | Spectator
  | PrevSpectators
  | GameIsStopped
  | EveryoneGuessed
  | PainterBucket
  | GameEnded
  | PainterTrash
  | PainterEraser
  | PainterPencil
  | PrevCanvas
  | PainterEraserOrPencilOut
  | YouPurchasedMarketItem
  | PurchasedMarketItem
  | PowerupUsed
  | YouUsedPowerup
  | PainterMouseDown
  | UndoRedo
  | Ping
)
/**
 * DirectlyFromClient is the type of data that is sent directly from the client.
 */
export type WebRTCConnDataFromClient = (
  | PainterEraserOrPencilOut
  | WinnersChatFromClient
  | GuessChatFromClient
  | PainterPencil
  | PainterEraser
  | PainterBucket
  | Pong
  | PainterTrash
  | SelectThemeFromClient
  | BuyMarketItem
  | PainterMouseDown
  | UsePowerup
  | UndoRedo
) 
