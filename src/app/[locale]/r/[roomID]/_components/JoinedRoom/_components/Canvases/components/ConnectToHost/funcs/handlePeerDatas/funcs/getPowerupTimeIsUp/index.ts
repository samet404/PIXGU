import type { PowerupTimeIsUp } from '@/types'
import { usePlayersPowerups } from '@/zustand/store'

export const getPowerupTimeIsUp = ({ name, userID }: PowerupTimeIsUp['data']) => {
    usePlayersPowerups.getState().setIsPowerupRunning(userID, name, false)
}