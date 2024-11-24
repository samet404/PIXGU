export type TimerWorkerOnMsgData = {
    ID: ID
    ms: number
    type: 'interval' | 'timeout'
    event: 'start'
} | {
    ID: ID
    event: 'stop'

} | {
    event: 'clear'
}

export type TimerWorkerPostMsgData = {
    ID: ID
}


export type ID = 'PAINTER_TIME_IS_UP' | 'GAME_ENDED'