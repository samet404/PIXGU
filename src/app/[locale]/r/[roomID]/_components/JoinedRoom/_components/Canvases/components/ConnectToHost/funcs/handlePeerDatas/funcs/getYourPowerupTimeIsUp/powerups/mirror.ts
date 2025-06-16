import { usePowerups } from '@/zustand/store/usePowerups'


export const mirror = () => {
    usePowerups.getState().setPowerupIsNotRunning('mirror')
}