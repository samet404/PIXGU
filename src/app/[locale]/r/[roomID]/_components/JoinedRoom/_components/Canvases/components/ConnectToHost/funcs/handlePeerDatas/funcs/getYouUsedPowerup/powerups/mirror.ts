import { usePowerups } from '@/zustand/store/usePowerups'

export const mirror = () => {
    usePowerups.getState().setPowerupRunning('mirror')
    usePowerups.getState().setPowerupInActive('mirror')
}