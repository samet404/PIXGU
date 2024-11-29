import type { Powerup } from '@/types'
import { create } from 'zustand'


const initValue: State = {
    value: {},
    prevValue: {}
}

export const usePlayersOwnedPowerups = create<State & Action>((set, get) => ({
    ...initValue,

    add: (userID, powerUp) => {
        console.log('powerup adding: ', userID, powerUp)
        set((state) => ({
            value: {
                ...state.value,
                [userID]: {
                    ...(state.value[userID] || {}),
                    [powerUp]: (state.value[userID]?.[powerUp] ?? 0) + 1
                } as Record<Powerup, number>
            }
        }))
    },

    remove: (userID, powerUp) => {
        console.log('powerup removing: ', userID, powerUp)
        set((state) => ({
            value: {
                ...state.value,
                [userID]: {
                    ...(state.value[userID] || {}),
                    [powerUp]: Math.max(0, (state.value[userID]?.[powerUp] ?? 0) - 1)
                } as Record<Powerup, number>
            }
        }))
    },

    reset: () => set({ ...initValue }),
}))




type UserID = string
type Value = Record<UserID, Record<Powerup, number>>
type State = {
    value: Value
    prevValue: Value
}

type Action = {
    add: (userID: UserID, powerUp: Powerup) => void
    remove: (userID: UserID, powerUp: Powerup) => void
    reset: () => void
}