import { MATCH_TIME_MINUTES, MATCH_TIME_SECONDS } from '@/constants'
import { useMatchStatus } from '@/zustand/store/useMatchStatus'
const totalCoinBonus = MATCH_TIME_MINUTES * 80

export const calculateCurrentCoin = () => {
    const remainSeconds = useMatchStatus.getState().value.remainSeconds!
    const dangerZone = remainSeconds <= 30 ? 0.5 : 1
    const passedSeconds = MATCH_TIME_SECONDS

    return parseFloat(((totalCoinBonus - passedSeconds) * dangerZone).toFixed(0))
}