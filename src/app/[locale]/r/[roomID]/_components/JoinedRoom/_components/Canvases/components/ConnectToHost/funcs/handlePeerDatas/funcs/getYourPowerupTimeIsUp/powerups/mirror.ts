import { usePowerups } from '@/zustand/store'

export const mirror = () => {
    usePowerups.getState().setPowerupIsNotRunning('mirror')
}