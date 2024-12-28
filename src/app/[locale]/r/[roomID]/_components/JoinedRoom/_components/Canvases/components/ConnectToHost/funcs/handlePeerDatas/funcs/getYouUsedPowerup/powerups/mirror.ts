import { usePowerups } from '@/zustand/store'

export const mirror = () => {
    usePowerups.getState().setPowerupRunning('mirror')
}