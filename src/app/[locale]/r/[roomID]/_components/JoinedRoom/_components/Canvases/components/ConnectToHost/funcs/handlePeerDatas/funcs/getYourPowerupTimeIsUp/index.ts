import type { YourPowerupTimeIsUp } from '@/types'
import { usePowerups } from '@/zustand/store'

export const getYourPowerupTimeIsUp = ({ name }: YourPowerupTimeIsUp['data']) => {
    usePowerups.getState().setPowerupIsNotRunning(name)
}