import type { UsePowerup } from '@/types'
import { letterHint } from './powerups'

export const getUsePowerup = (data: UsePowerup['data'], userID: string) => {
    const { name } = data

    switch (name) {
        case 'letterHint':
            letterHint(userID)
            break
        case 'ai':
            break
        default:
            break
    }
}