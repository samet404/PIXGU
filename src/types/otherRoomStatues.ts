export type OtherRoomStatues = {
  matchTimeout: ReturnType<typeof setTimeout> | null
  isFirstMatch: boolean
  theme: string | null
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
