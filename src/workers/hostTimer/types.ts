export type TimerWorkerOnMsgData = {
    ID: mainID
    otherIDs?: string[]
    ms: number
    type: 'interval' | 'timeout'
    event: 'start'
    triggerNow?: boolean
} | {
    ID: mainID
    otherIDs?: string[]
    event: 'stop'
} | {
    event: 'clear'
}

export type TimerWorkerPostMsgData = {
    ID: mainID
    otherIDs?: string[]
}

export type mainID = 'PAINTER_TIME_IS_UP' | 'GAME_ENDED' | 'MATCH_ENDED' | 'MATCH_REMAIN_TIME' | 'RTT' | `ROTATE_POWERUP` | `MIRROR_POWERUP` | `UNDO_BLOCK_POWERUP` | `ZA_WARUDO_POWERUP` | 'INVISIBLE_PENCIL_POWERUP'