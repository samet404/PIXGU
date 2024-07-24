export type OtherRoomStatues = {
  matchTimeout: NodeJS.Timeout | null
  isFirstMatch: boolean
  theme: string | null
  players: {
    info: Record<string, Player>
    count: number
    secondPainterIndex: number | null
  }
} & MatchPaused

type MatchPaused =
  | {
      isMatchPaused: true
      matchPausedReason:
        | 'WAITING_FOR_PLAYERS'
        | 'ADMIN_PAUSED'
        | 'BREAK_WITH_VOTES'
    }
  | { isMatchPaused: false }

type GuessingPlayer = {
  isPainter: false
  isGuessed: boolean
}

type PainterPlayer = {
  isPainter: true
}

type Player = GuessingPlayer | PainterPlayer
