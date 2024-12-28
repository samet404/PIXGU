import { GUESSR_CARDS, GUESSR_CARDS_WHILE_THEME_IS_SELECTING, INIT_RUNNING_POWERUPS, PAINTER_CARDS, PAINTER_CARDS_WHILE_THEME_IS_SELECTING, WINNERS_CARDS } from '@/constants'
import { create } from 'zustand'
import type { PowerupState } from './usePowerups'
import type { PartialRecord } from '@/types/partialRecord'
import type { Powerup, TimeBasedPowerups } from '@/types'


const initState: State = {
    runningPowerups: INIT_RUNNING_POWERUPS,
    users: {}
}

export const usePlayersPowerups = create<State & Action>((set, get) => ({
    ...initState,

    removeUser: (ID: ID) => set({
        users: Object.fromEntries(
            Object.entries(get().users).filter(([key]) => key !== ID)
        ),
    }),

    setIsPowerupRunning: (ID: ID, powerup: Powerup, value: boolean) => {
        const user = get().users[ID]
        if (!user) return

        set({
            runningPowerups: {
                ...get().runningPowerups,
                [powerup]: value
            },
            users: {
                ...get().users,
                [ID]: {
                    ...user,
                    powerups: {
                        ...user.powerups,
                        [powerup]: {
                            ...user.powerups[powerup],
                            running: value
                        }
                    }
                }
            }
        })

    },

    setPowerupRunning: (ID: ID, powerup: Powerup) => get().setIsPowerupRunning(ID, powerup, true),
    setPowerupIsNotRunning: (ID: ID, powerup: Powerup) => get().setIsPowerupRunning(ID, powerup, false),

    setPowerupInActive: (ID: ID, powerup: Powerup) => {
        const user = get().users[ID]
        if (!user) return

        set({
            users: {
                ...get().users,
                [ID]: {
                    ...user,
                    activePowerups: user.activePowerups.filter(p => p !== powerup),
                    powerups: {
                        ...user.powerups,
                        [powerup]: {
                            isActive: false
                        }
                    }
                }
            }
        })
    },

    setPainterCardsWhileThemeIsSelecting: (ID: ID) => set({
        users: {
            ...get().users,
            [ID]: PAINTER_CARDS_WHILE_THEME_IS_SELECTING
        }
    }),

    setGuessrCardsWhileThemeIsSelecting: (ID: ID) => set({
        users: {
            ...get().users,
            [ID]: GUESSR_CARDS_WHILE_THEME_IS_SELECTING
        }
    }),

    setGuessrPowerups: (ID: ID) => set({ users: { ...get().users, [ID]: GUESSR_CARDS } }),
    setPainterPowerups: (ID: ID) => set({ users: { ...get().users, [ID]: PAINTER_CARDS } }),
    setWinnersPowerups: (ID: ID) => set({ users: { ...get().users, [ID]: WINNERS_CARDS } }),
    reset: () => set({ ...initState })
}))

type ID = string
type State = {
    users: PartialRecord<ID, PowerupState>
    runningPowerups: Record<TimeBasedPowerups, ID[]>
}

type Action = {
    setPowerupInActive: (ID: ID, powerup: Powerup) => void
    setPainterCardsWhileThemeIsSelecting: (ID: ID) => void
    setGuessrCardsWhileThemeIsSelecting: (ID: ID) => void
    setPainterPowerups: (ID: ID) => void
    setIsPowerupRunning: (ID: ID, powerup: Powerup, value: boolean) => void
    setPowerupRunning: (ID: ID, powerup: Powerup) => void
    setPowerupIsNotRunning: (ID: ID, powerup: Powerup) => void
    setGuessrPowerups: (ID: ID) => void
    setWinnersPowerups: (ID: ID) => void
    removeUser: (ID: ID) => void
    reset: () => void
}