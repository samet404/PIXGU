export type TimerWorkerOnMsgData = {
    ID: ID
    data?: any
    ms: number
    type: 'interval' | 'timeout'
    event: 'start'
    triggerNow?: boolean
} | {
    ID: ID
    event: 'stop'

} | {
    event: 'clear'
}

export type TimerWorkerPostMsgData = {
    ID: ID
    data?: any
}

export type ID = 'PAINTER_TIME_IS_UP' | 'GAME_ENDED' | 'MATCH_ENDED' | 'MATCH_REMAIN_TIME' | 'RTT' | 'ROTATE_POWERUP' | 'MIRROR_POWERUP' | 'UNDO_BLOCK_POWERUP' | 'ZA_WARUDO_POWERUP' | 'INVISIBLE_PENCIL_POWERUP'