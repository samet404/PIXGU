import { usePowerups } from '@/zustand/store'

export const mirror = () => {
    usePowerups.getState().setPowerupRunning('mirror')
    usePowerups.getState().setPowerupInActive('mirror')
}