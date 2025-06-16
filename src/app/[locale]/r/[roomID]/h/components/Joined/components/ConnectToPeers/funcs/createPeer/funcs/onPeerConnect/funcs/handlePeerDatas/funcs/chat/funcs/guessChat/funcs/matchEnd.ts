import { createMatch } from '@/helpers/room'
import type { Locale } from '@/types/locale'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { postMsgToHostTimerWorker } from '@/workers'
import { useMatchStatus } from '@/zustand/store/useMatchStatus'
export const matchEnd = (locale: Locale) => {
    postMsgToHostTimerWorker({
        ID: 'MATCH_ENDED',
        event: 'stop',
    })
    postMsgToHostTimerWorker({
        ID: 'MATCH_REMAIN_TIME',
        event: 'stop',
    })
    useMatchStatus.getState().timeoutCancelled()

    sendToAllPeers({
        event: 'everyoneGuessed',
    })

    createMatch(locale)
}