import type { PowerupUsed } from '@/types/webRTCConnData'

export const getPowerupUsed = (data: PowerupUsed['data']) => {
    const { name, userID } = data

    console.log('getPowerupUsed: ', name, userID)
}