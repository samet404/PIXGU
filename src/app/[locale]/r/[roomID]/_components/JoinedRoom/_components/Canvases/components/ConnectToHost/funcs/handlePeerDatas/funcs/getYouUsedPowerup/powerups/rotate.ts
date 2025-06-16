import { usePowerups } from '@/zustand/store/usePowerups'

export const rotate = () => {
    usePowerups.getState().setPowerupRunning('rotate')
    usePowerups.getState().setPowerupInActive('rotate')
}