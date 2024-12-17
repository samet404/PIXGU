import type { YouUsedPowerup } from '@/types'
import { useLetterHint, useOwnedPowerups } from '@/zustand/store'

export const getYouUsedPowerup = (rtcData: YouUsedPowerup['data']) => {
    const { data, name } = rtcData
    console.log('getYouUsedPowerup  funccc', data, name, rtcData)

    useOwnedPowerups.getState().remove(name)
    switch (name) {
        case 'letterHint':
            console.log('letter hint useLetterHint')
            useLetterHint.getState().use(data)
            break
        // case 'ai':
        //     break
        // case 'addTime':
        //     break
    }
}
