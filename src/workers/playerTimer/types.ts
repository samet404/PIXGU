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


export type ID = 'MATCH_REMAIN_TIME'