export type PlayerTimerWorkerOnMsgData = {
    ID: PlayerTimerID
    ms: number
    type: 'interval' | 'timeout'
    event: 'start'
} | {
    ID: PlayerTimerID
    event: 'stop'

} | {
    event: 'clear'
}

export type PlayerTimerWorkerPostMsgData = {
    ID: PlayerTimerID
}


export type PlayerTimerID = 'MATCH_REMAIN_TIME' | 'PAINTER_SELECTING_REMAIN_TIME' | 'GAME_ENDED' 